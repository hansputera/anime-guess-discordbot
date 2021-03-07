import { Listener } from "discord-akairo";
import type { Guild } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class GuildDeleteEvent extends Listener {
    constructor(public client: AnimeClient) {
        super('GuildDeleteEvent', {
            emitter: 'client',
            event: 'guildDelete',
            category: 'client'
        });
    }

    public async exec(guild: Guild) {
        await this.client.guildManager.remove(guild.id);
        console.log(guild.name, 'removed');
    }
}