import { MessageEmbed, TextChannel } from "discord.js";
import OtakuDesu from "otakudesu-scrape";
import type { Desu } from "../typings";
import type AnimeClient from "./AnimeClient";
const otakudesu = new OtakuDesu();

async function generate() {
    const animes = await otakudesu.ongoing();
    const randomIndex = Math.floor(Math.random() * animes.length);
    const anime = await otakudesu.anime(animes[randomIndex].parse_name);
    const filterNames = anime.details.judul.split(' ').filter(t => /^[\w.-]+$/gi.test(t));
    return {
        parse: animes[randomIndex].parse_name,
        regex: new RegExp(`(${filterNames.join('|')})`, 'gi'),
        ...anime
    }
}

class AnimeDesu {
    constructor(private client: AnimeClient) {}
    public works: Map<string, Desu> = new Map();

    public getGuild(guildID: string) {
        return this.works.get(guildID);
    }
    public async addGuild(guildID: string, channel: TextChannel) {
        const work = this.getGuild(guildID);
        if (work) return false;
        const anime = await generate();
        function censorTitle(str: string) {
            return str[0] + '*'.repeat(str.length - 2) + str.slice(-1);
        }
        const embed = new MessageEmbed()
        .setColor('RANDOM')
        .setTitle(censorTitle(anime.details.judul))
        .setImage(anime.image)
        .setDescription('Ayo tebak ini anime apa?')
        .setTimestamp();
        const m = await channel.send(embed);
        this.works.set(guildID, {
            regex: anime.regex,
            anime: {
                title: anime.details.judul,
                parse: anime.parse,
                image: anime.image
            },
            m,
            timeout: setTimeout(() => {
                if (!this.getGuild(guildID)) return;
                this.remGuild(guildID);
                m.delete();
                channel.send('Kayaknya gada yang berhasil jawab deh <3\nJawabannya adalah: ' + anime.details.judul);
            }, 30 * 1000)
        });
        return true;
    }
    public remGuild(guildID: string) {
        const work = this.getGuild(guildID);
        if (!work) return undefined;
        this.works.delete(guildID);
        return work;
    }
}

export default {
    generate, AnimeDesu
};