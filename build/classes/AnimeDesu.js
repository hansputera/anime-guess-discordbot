"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const otakudesu_scrape_1 = __importDefault(require("otakudesu-scrape"));
const otakudesu = new otakudesu_scrape_1.default();
async function generate() {
    const animes = await otakudesu.home();
    const randomIndex = Math.floor(Math.random() * animes.length);
    const anime = await otakudesu.anime(animes[randomIndex].parse_name);
    const filterNames = anime.title.split(' ').filter(t => /^[\w.-]+$/gi.test(t));
    return Object.assign({ parse: animes[randomIndex].parse_name, regex: new RegExp(`(${filterNames.join('|')})`, 'gi') }, anime);
}
class AnimeDesu {
    constructor(client) {
        this.client = client;
        this.works = new discord_js_1.Collection();
    }
    getGuild(guildID) {
        return this.works.get(guildID);
    }
    async addGuild(guildID, channel) {
        const work = this.getGuild(guildID);
        if (work)
            return false;
        const anime = await generate();
        function censorTitle(str) {
            return str[3] + '*'.repeat(str.length - 2) + str.slice(-1);
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor('RANDOM')
            .setTitle(censorTitle(anime.title))
            .setImage(anime.image)
            .setDescription('Ayo tebak ini anime apa?')
            .setTimestamp();
        const m = await channel.send(embed);
        this.works.set(guildID, {
            regex: anime.regex,
            anime: {
                title: anime.title,
                parse: anime.parse,
                image: anime.image
            },
            m,
            timeout: setTimeout(() => {
                m.delete();
                channel.send('Kayaknya gada yang berhasil jawab deh <3\nJawabannya adalah: ' + anime.title);
            }, 30 * 1000)
        });
        return true;
    }
    remGuild(guildID) {
        const work = this.getGuild(guildID);
        if (!work)
            return undefined;
        this.works.delete(guildID);
        return work;
    }
}
exports.default = {
    generate, AnimeDesu
};
