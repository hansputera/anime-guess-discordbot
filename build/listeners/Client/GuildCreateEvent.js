"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class GuildCreateEVent extends discord_akairo_1.Listener {
    constructor(client) {
        super('GuildCreateEvent', {
            event: 'guildCreate',
            emitter: 'client',
            category: 'client'
        });
        this.client = client;
    }
    async exec(guild) {
        await this.client.guildManager.add(guild.id);
        const randomChannel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(this.client.user).has('SEND_MESSAGES'));
        if (!randomChannel)
            return;
        console.log(guild.name, 'added');
        this.client.channels.cache.get(randomChannel.id).send(`Terimakasih banyak telah menambahkan ku ke server ini, perkenalkan nama saya ${this.client.user.username}. Aku bisa bermain tebak-tebakan anime di server ini bersama kalian semua :wave:, haii!!`);
    }
}
exports.default = GuildCreateEVent;
