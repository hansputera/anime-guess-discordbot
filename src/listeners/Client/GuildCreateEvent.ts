import { Listener } from "discord-akairo";
import type { Guild, TextChannel } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class GuildCreateEVent extends Listener {
    constructor(public client: AnimeClient) {
        super('GuildCreateEvent', {
            event: 'guildCreate',
            emitter: 'client',
            category: 'client'
        });
    }

    public async exec(guild: Guild) {
        await this.client.guildManager.add(guild.id);
        const randomChannel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(this.client.user!)!.has('SEND_MESSAGES'));
        if (!randomChannel) return;
        console.log(guild.name, 'added');
        (this.client.channels.cache.get(randomChannel!.id) as TextChannel).send(
            `Terimakasih banyak telah menambahkan ku ke server ini, perkenalkan nama saya ${this.client.user!.username}. Aku bisa bermain tebak-tebakan anime di server ini bersama kalian semua :wave:, haii!!`
            );
    }
}