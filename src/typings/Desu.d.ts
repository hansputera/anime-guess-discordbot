import type { Message } from "discord.js";

export interface Desu {
    timeout?: NodeJS.Timeout;
    anime: {
        title: string;
        parse: string;
        image: string;
    };
    regex: RegExp;
    m: Message;
}