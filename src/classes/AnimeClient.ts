import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import type { ClientOptions } from "discord.js";
import { resolve } from "path";
import config from "../config.json";
import GuildManager from "../util/Guild";
import UserManager from "../util/User";
import Desu from "./AnimeDesu";
import Database from "./Database";

export default class AnimeClient extends AkairoClient {
    constructor(clientOptions?: ClientOptions) {
        super({
            ownerID: config.ownerID
        }, clientOptions);
    }

    public db: typeof Database = Database;
    public desu = {
        class: new Desu.AnimeDesu(this),
        gen: Desu.generate
    };
    public userManager = new UserManager(this);
    public guildManager = new GuildManager(this);
    readonly config = config;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: resolve(__dirname, '..', 'listeners')
    });
    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: resolve(__dirname, '..', 'commands'),
        prefix: config.PREFIX,
        allowMention: true,
        aliasReplacement: /-/g,
        storeMessages: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 5000,
        argumentDefaults: {
            prompt: {
                modifyStart: (_, str: string) => `${str}\n\nKetik \`cancel\` untuk membatalkan perintah!`,
                modifyRetry: (_, str): string => `${str}\n\nKetik \`cancel\` untuk membatalkan perintah!`,
                timeout: "Kamu sangat lama, perintah otomatis dibatalkan <:(",
                ended: "Kamu mencapai batas maksimal pengulangan perintah, perintah ini telah dibatalkan!",
                cancel: "Perintah telah dibatalkan.",
                retries: 3,
                time: 30000
            },
            otherwise: ''
        }
    });

    private _init() {
        this.listenerHandler.setEmitters({
            listenerHandler: this.listenerHandler,
            commandHandler: this.commandHandler
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public start() {
        this._init();
        return this.login(config.TOKEN);
    }
}