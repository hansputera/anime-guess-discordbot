"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
class CommandStartedEvent extends discord_akairo_1.Listener {
    constructor(client) {
        super('CommandStartedEvent', {
            event: 'commandStarted',
            category: 'commandHandler',
            emitter: 'commandHandler'
        });
        this.client = client;
    }
    exec(message, command) {
        console.log(message.author.tag, 'using', command.id, 'in', message.guild.name, `[${Date.now()}]`);
    }
}
exports.default = CommandStartedEvent;
