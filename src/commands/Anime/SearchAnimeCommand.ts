import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import Otakudesu from "otakudesu-scrape";
const otaku = new Otakudesu();

export default class SearchAnimeCommand extends Command {
    constructor() {
        super('search-anime', {
            aliases: ['searchanime', 'cari-anime'],
            category: 'Anime',
            description: 'Mencari anime dengan informasi berdasarkan otakudesu.moe',
            args: [
                {
                    id: 'anime',
                    match: 'rest',
                    prompt: {
                        start: 'Masukan nama anime yang ingin kamu cari!',
                        retry: 'Masukan nama anime yang ingin kamu cari!'
                    }
                }
            ]
        });
    }

    public async exec(message: Message, { anime }:{ anime: string; }) {
        const animes = await otaku.searchAnime(anime);
        if (!animes.length) return message.util!.send('Anime tidak dapat ditemukan!');
        message.util!.send('Aku menemukan ' + animes.length + ' anime, namun aku mengambil yang paling teratas!');
        const anime0 = animes.shift()!;
        const anime0info = await otaku.anime(anime0.parse_name);
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(anime0.name, anime0.image)
        .setDescription(anime0info.synopsis)
        .setImage(anime0.image)
        .addField('Episodes', anime0info.episodes.map(ep => `**[${ep.title}](${ep.url})**`).join(' | '))
        .setTimestamp();
        message.util!.send(embed);
    }
}