import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const DATABASE_NAME = "dev_forum";

await client.connect();
const db = client.db(DATABASE_NAME);
export default db;
