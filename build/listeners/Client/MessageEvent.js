"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class MessageEvent extends discord_akairo_1.Listener {
    constructor(client) {
        super('MessageEvent', {
            emitter: 'client',
            event: 'message',
            category: 'client'
        });
        this.client = client;
    }
    async exec(message) {
        const workGuild = this.client.desu.class.getGuild(message.guild.id);
        if (workGuild) {
            if (workGuild.m.channel.id === message.channel.id && workGuild.regex.test(message.content)) {
                workGuild.m.delete();
                // if content is match.
                const balance = Math.floor(Math.random() * 20);
                await this.client.userManager.addCollection(message.author.id, {
                    name: workGuild.anime.title,
                    image: workGuild.anime.image,
                    parse: workGuild.anime.parse
                });
                await this.client.userManager.addBalance(message.author.id, balance);
                message.reply(`Horay, kita dapat pemenang disini <3. Yup, jawaban kamu betul \`${message.content}\` sesuai dengan jawaban yakni adalah \`${workGuild.anime.title}\`. Sebagai hadiah kamu benar, kamu mendapat uang sebesar ${balance} Desu.`);
            }
        }
    }
}
exports.default = MessageEvent;
