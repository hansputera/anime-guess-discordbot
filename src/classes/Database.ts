import { MongoClient } from "mongodb";

const client = new MongoClient('mongodb://localhost:27017', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
client.connect((error) => {
   if (error) throw Error('MongoDB Connection fail');
});

export default client.db('anime-guess');