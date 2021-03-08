"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class PingCommand extends discord_akairo_1.Command {
    constructor() {
        super('ping', {
            aliases: ['pong', 'ping'],
            editable: true,
            ratelimit: 3,
            description: 'Bermain Ping Pong!',
            category: 'Core'
        });
    }
    exec(message) {
        message.util.send(`:ping_pong: Pong! ${this.client.ws.ping}ms`);
    }
}
exports.default = PingCommand;
