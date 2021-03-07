import { Command } from "discord-akairo";
import type { Message } from "discord.js";

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['pong'],
            editable: true,
            ratelimit: 3,
            description: 'Bermain Ping Pong!',
            category: 'Core'
        });
    }

    public exec(message: Message) {
        message.util!.send(`:ping_pong: Pong! ${this.client.ws.ping}ms`);
    }
}