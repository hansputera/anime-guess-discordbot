"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
client.connect((error) => {
    if (error)
        throw Error('MongoDB Connection fail');
});
exports.default = client.db('anime-guess');
