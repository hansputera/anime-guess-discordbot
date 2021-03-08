import { Listener } from "discord-akairo";
import type { Message } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class MessageEvent extends Listener {
    constructor(public client: AnimeClient) {
        super('MessageEvent', {
            emitter: 'client',
            event: 'message',
            category: 'client'
        });
    }

    public async exec(message: Message) {
        if (message.author.bot) return;
        const workGuild = this.client.desu.class.getGuild(message.guild!.id);
        if (workGuild) {
            if (workGuild.m.channel.id === message.channel.id && workGuild.regex.test(message.content)) {
                workGuild.timeout = undefined;
                this.client.desu.class.remGuild(workGuild.m.guild!.id);
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