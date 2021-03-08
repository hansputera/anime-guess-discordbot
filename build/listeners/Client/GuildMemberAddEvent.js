"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class GuildMemberAddEvent extends discord_akairo_1.Listener {
    constructor(client) {
        super('GuildMemberAddEvent', {
            event: 'guildMemberAdd',
            emitter: 'client',
            category: 'client'
        });
        this.client = client;
    }
    async exec(member) {
        if ((await this.client.userManager.get(member.id)))
            return;
        await this.client.userManager.add(member.id);
        console.log(member.user.tag, 'added');
    }
}
exports.default = GuildMemberAddEvent;
