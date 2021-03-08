"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class GuildDeleteEvent extends discord_akairo_1.Listener {
    constructor(client) {
        super('GuildDeleteEvent', {
            emitter: 'client',
            event: 'guildDelete',
            category: 'client'
        });
        this.client = client;
    }
    async exec(guild) {
        await this.client.guildManager.remove(guild.id);
        console.log(guild.name, 'removed');
    }
}
exports.default = GuildDeleteEvent;
