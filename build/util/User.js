"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor(client) {
        this.client = client;
    }
    async all() {
        return (await this.client.db.collection('users').find({}).toArray());
    }
    async add(userID) {
        const user = await this.get(userID);
        if (user)
            return false;
        const userInfracts = {
            id: userID,
            balance: Math.floor(Math.random() * 10),
            registered: Date.now(),
            collections: []
        };
        await this.client.db.collection('users').insertOne(userInfracts);
        return true;
    }
    async get(userID) {
        return (await this.all()).find(user => user.id === userID);
    }
    async remove(userID) {
        const user = await this.get(userID);
        if (!user)
            return false;
        await this.client.db.collection('users').deleteOne({ _id: user._id });
        return true;
    }
    async addBalance(userID, balance) {
        const user = await this.get(userID);
        if (!user)
            return false;
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { balance: user.balance + balance } });
        return true;
    }
    async removeBalance(userID, balance) {
        const user = await this.get(userID);
        if (!user)
            return false;
        if ((user.balance - balance) <= 0)
            return false;
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { balance: user.balance - balance } });
        return true;
    }
    async addCollection(userID, card) {
        const user = await this.get(userID);
        if (!user)
            return false;
        const collections = user.collections;
        if (collections.find(collection => collection.name === card.name))
            return false;
        collections.push(card);
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { collections } });
        return true;
    }
    async delCollection(userID, card_title) {
        const user = await this.get(userID);
        if (!user)
            return false;
        let collections = user.collections;
        if (!collections.find(collection => collection.name === card_title))
            return false;
        collections = collections.filter(card => card.name !== card_title);
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { collections } });
        return true;
    }
}
exports.default = UserManager;
