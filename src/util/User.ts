import type AnimeClient from "../classes/AnimeClient";
import type { UserCard, UserDesu } from "../typings";

export default class UserManager {
    constructor(private client: AnimeClient) {}

    async all() {
        return (await this.client.db.collection('users').find({}).toArray()) as UserDesu[];
    }
    async add(userID: string) {
        const user = await this.get(userID);
        if (user) return false;
        const userInfracts = {
            id: userID,
            balance: Math.floor(Math.random() * 10),
            registered: Date.now(),
            collections: []
        }
        await this.client.db.collection('users').insertOne(userInfracts);
        return true;
    }
    async get(userID: string) {
        return (await this.all()).find(user => user.id === userID);
    }
    async remove(userID: string) {
        const user = await this.get(userID);
        if (!user) return false;
        await this.client.db.collection('users').deleteOne({ _id: user._id });
        return true;
    }
    async addBalance(userID: string, balance: number) {
        const user = await this.get(userID);
        if (!user) return false;
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { balance: user.balance + balance }});
        return true;
    }
    async removeBalance(userID: string, balance: number) {
        const user = await this.get(userID);
        if (!user) return false;
        if ((user.balance - balance) <= 0) return false;
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { balance: user.balance - balance }});
        return true;
    }
    async addCollection(userID: string, card: UserCard) {
        const user = await this.get(userID);
        if (!user) return false;
        const collections = user.collections;
        if (collections.find(collection => collection.name === card.name)) return false;
        collections.push(card);
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { collections }});
        return true;
    }
    async delCollection(userID: string, card_title: string) {
        const user = await this.get(userID);
        if (!user) return false;
        let collections = user.collections;
        if (!collections.find(collection => collection.name === card_title)) return false;
        collections = collections.filter(card => card.name !== card_title);
        await this.client.db.collection('users').updateOne({ _id: user._id }, { $set: { collections }});
        return true;
    }
}