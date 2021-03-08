import { Command } from "discord-akairo";
import type { Message, TextChannel } from "discord.js";
import AnimeClient from "../../classes/AnimeClient";

export default class ChangeSpawnChannel extends Command {
    constructor(public client: AnimeClient) {
        super('change-spawn', {
            aliases: ['change-spawn-channel', 'changespawn', 'ganti-spawn-channel'],
            description: 'Mengganti spawn channel',
            editable: true,
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            args: [
                {
                    id: 'channel',
                    type: 'channel',
                    prompt: {
                        start: 'Masukan channel!',
                        retry: 'Masukan channel!'
                    }
                }
            ]
        });
    }

    public async exec(message: Message, { channel }:{ channel: TextChannel }) {
        const guild = await this.client.guildManager.get(message.guild!.id);
        if (guild!.spawnChannel === channel.id) return message.util!.send('Spawn Channel tidak boleh sama dengan channel yang baru');
        await this.client.guildManager.changeSpawn(guild!.id, channel.id);
        message.util!.send('Spawn Channel telah diganti!');
    }
}