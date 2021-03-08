"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const discord_js_1 = require("discord.js");
const otakudesu_scrape_1 = __importDefault(require("otakudesu-scrape"));
const otaku = new otakudesu_scrape_1.default();
class SearchAnimeCommand extends discord_akairo_1.Command {
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
    async exec(message, { anime }) {
        const animes = await otaku.searchAnime(anime);
        if (!animes.length)
            return message.util.send('Anime tidak dapat ditemukan!');
        const anime0 = animes.shift();
        const anime0info = await otaku.anime(anime0.parse_name);
        const episodesText = anime0info.episodes.map(ep => `- **[${ep.title}](${ep.url})**`).filter((_, i) => i < 5);
        const batchEpisode = anime0info.episodes.find(ep => /batch/gi.test(ep.title));
        const batchDownloads = batchEpisode ? (await otaku.downloads(batchEpisode.url))[0].links : undefined;
        let downloadText = "";
        if (batchDownloads) {
            const keysDownload = Object.keys(batchDownloads);
            const valsDownload = Object.values(batchDownloads);
            keysDownload.forEach((key, index) => {
                downloadText += `**[${key}](${valsDownload[index]})** | `;
            });
        }
        const embed = new discord_js_1.MessageEmbed()
            .setColor('RANDOM')
            .setAuthor(anime0.name, anime0.image)
            .setDescription(anime0info.synopsis)
            .setImage(anime0.image)
            .addField('Episodes', episodesText.join('\n'))
            .addField('Batch Downloads', downloadText ? downloadText : 'I can\'t find downloads link!')
            .setTimestamp();
        message.util.send(embed);
    }
}
exports.default = SearchAnimeCommand;
