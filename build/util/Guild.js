"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GuildManager {
    constructor(client) {
        this.client = client;
    }
    async all() {
        return (await this.client.db.collection('guilds').find({}).toArray());
    }
    async add(guildID) {
        const guild = await this.get(guildID);
        if (guild)
            return false;
        const gds = { "id": guildID, "spawnChannel": 0 };
        await this.client.db.collection('guilds').insertOne(gds);
        return true;
    }
    async get(guildID) {
        return (await this.all()).find(guild => guild.id === guildID);
    }
    async remove(guildID) {
        const guild = await this.get(guildID);
        if (!guild)
            return false;
        await this.client.db.collection('guilds').deleteOne({ _id: guild._id });
        return true;
    }
    async changeSpawn(guildID, channel) {
        const guild = await this.get(guildID);
        if (!guild)
            return false;
        if (guild.spawnChannel === channel)
            return false;
        await this.client.db.collection('guilds').updateOne({ _id: guild._id }, { $set: { spawnChannel: channel } });
        return true;
    }
}
exports.default = GuildManager;
