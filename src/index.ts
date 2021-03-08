import { config } from "dotenv";
import AnimeClient from "./classes/AnimeClient";

config();
new AnimeClient({
    disableMentions: 'everyone',
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: 'Discord iOS'
        }
    }
}).start();