import { Command, Listener } from "discord-akairo";
import type { Message } from "discord.js";
import type AnimeClient from "../../classes/AnimeClient";

export default class CommandStartedEvent extends Listener {
    constructor(public client: AnimeClient) {
        super('CommandStartedEvent', {
            event: 'commandStarted',
            category: 'commandHandler',
            emitter: 'commandHandler'
        });
    }

    public exec(message: Message, command?: Command) {
        console.log(message.author.tag, 'using', command!.id, 'in', message.guild!.name, `[${Date.now()}]`);
    }
}