import { Command } from "discord-akairo";
import { Message, MessageEmbed } from "discord.js";
import Otakudesu from "otakudesu-scrape";
const otaku = new Otakudesu();

export default class SearchAnimeCommand extends Command {
    constructor() {
        super('search-anime', {
            editable: true,
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
        const anime0 = animes.shift()!;
        const anime0info = await otaku.anime(anime0.parse_name);

        const episodesText = anime0info.episodes.map(ep => `- **[${ep.title}](${ep.url})**`).filter((_, i) => i < 5);
        const batchEpisode = anime0info.episodes.find(ep => /batch/gi.test(ep.title));
        const batchDownloads = batchEpisode ? (await otaku.downloads(batchEpisode.url))![0].links : undefined;

        let downloadText: string | undefined = "";
        if (batchDownloads) {
            const keysDownload = Object.keys(batchDownloads);
            const valsDownload = Object.values(batchDownloads);

            keysDownload.forEach((key, index) => {
                downloadText += `**[${key}](${valsDownload[index]})** | `;
            });
        }
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(anime0.name, anime0.image)
        .setDescription(anime0info.synopsis)
        .setImage(anime0.image)
        .addField('Episodes', episodesText.join('\n'))
        .addField('Batch Downloads', downloadText ? downloadText : 'I can\'t find downloads link!')
        .setTimestamp();
        message.util!.send(embed);
    }
}