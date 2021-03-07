import type { ObjectId } from "bson";

export interface GuildDesu {
    _id: ObjectId;
    id: string;
    spawnChannel?: string;
}