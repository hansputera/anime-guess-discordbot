import type { ObjectId } from "bson";

export interface UserCard {
    name: string;
    image: string;
    parse: string;
}

export interface UserDesu {
    _id: ObjectId;
    id: string;
    collections: UserCard[];
    registered: number;
    balance: number;
}