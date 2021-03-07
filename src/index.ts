import AnimeClient from "./classes/AnimeClient";

new AnimeClient({
    disableMentions: 'everyone',
    fetchAllMembers: true,
    ws: {
        properties: {
            $browser: 'Discord iOS'
        }
    }
}).start();