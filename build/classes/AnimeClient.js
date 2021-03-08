"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const path_1 = require("path");
const config_json_1 = __importDefault(require("../config.json"));
const Guild_1 = __importDefault(require("../util/Guild"));
const User_1 = __importDefault(require("../util/User"));
const AnimeDesu_1 = __importDefault(require("./AnimeDesu"));
const Database_1 = __importDefault(require("./Database"));
class AnimeClient extends discord_akairo_1.AkairoClient {
    constructor(clientOptions) {
        super({
            ownerID: config_json_1.default.ownerID
        }, clientOptions);
        this.db = Database_1.default;
        this.desu = {
            class: new AnimeDesu_1.default.AnimeDesu(this),
            gen: AnimeDesu_1.default.generate
        };
        this.userManager = new User_1.default(this);
        this.guildManager = new Guild_1.default(this);
        this.config = config_json_1.default;
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.resolve(__dirname, '..', 'listeners')
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.resolve(__dirname, '..', 'commands'),
            prefix: config_json_1.default.PREFIX,
            allowMention: true,
            aliasReplacement: /-/g,
            storeMessages: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            defaultCooldown: 5000,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => `${str}\n\nKetik \`cancel\` untuk membatalkan perintah!`,
                    modifyRetry: (_, str) => `${str}\n\nKetik \`cancel\` untuk membatalkan perintah!`,
                    timeout: "Kamu sangat lama, perintah otomatis dibatalkan <:(",
                    ended: "Kamu mencapai batas maksimal pengulangan perintah, perintah ini telah dibatalkan!",
                    cancel: "Perintah telah dibatalkan.",
                    retries: 3,
                    time: 30000
                },
                otherwise: ''
            }
        });
    }
    _init() {
        this.listenerHandler.setEmitters({
            listenerHandler: this.listenerHandler,
            commandHandler: this.commandHandler
        });
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
    start() {
        this._init();
        return this.login(process.env.TOKEN);
    }
}
exports.default = AnimeClient;
