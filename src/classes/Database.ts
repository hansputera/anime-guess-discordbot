import { MongoClient } from "mongodb";

const client = new MongoClient('http://localhost:27017');
client.connect((error) => {
   if (error) throw Error('MongoDB Connection fail');
});

export default client.db('anime-guess');