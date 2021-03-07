import { Listener } from "discord-akairo";
import type { GuildMember } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class GuildMemberAddEvent extends Listener {
    constructor(public client: AnimeClient) {
        super('GuildMemberAddEvent', {
            event: 'guildMemberAdd',
            emitter: 'client',
            category: 'client'
        });
    }

    public async exec(member: GuildMember) {
        if ((await this.client.userManager.get(member.id))) return;
        await this.client.userManager.add(member.id);
        console.log(member.user!.tag, 'added');
    }
}