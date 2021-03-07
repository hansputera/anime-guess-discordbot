import type AnimeClient from "../classes/AnimeClient";
import type { GuildDesu } from "../typings";

export default class GuildManager {
    constructor(private client: AnimeClient) {}

    public async all() {
        return (await this.client.db.collection('guilds').find({}).toArray()) as GuildDesu[];
    }
    public async add(guildID: string) {
        const guild = await this.get(guildID);
        if (guild) return false;
        const gds = { "id": guildID, "spawnChannel": 0 };
        await this.client.db.collection('guilds').insertOne(gds);    
        return true;
    }
    public async get(guildID: string) {
        return (await this.all()).find(guild => guild.id === guildID);
    }
    public async remove(guildID: string) {
        const guild = await this.get(guildID);
        if (!guild) return false;
        await this.client.db.collection('guilds').deleteOne({ _id: guild._id });
        return true;
    }
    public async changeSpawn(guildID: string, channel: string) {
        const guild = await this.get(guildID);
        if (!guild) return false;
        if (guild.spawnChannel === channel) return false;
        await this.client.db.collection('guilds').updateOne({ _id: guild._id }, { $set: { spawnChannel: channel }});
        return true;
    }
}