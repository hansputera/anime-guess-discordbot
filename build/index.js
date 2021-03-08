"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const AnimeClient_1 = __importDefault(require("./classes/AnimeClient"));
dotenv_1.config();
new AnimeClient_1.default({
    disableMentions: 'everyone',
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: 'Discord iOS'
        }
    }
}).start();
