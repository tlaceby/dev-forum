import { MongoClient } from "mongodb";
import { MONGODB_URI } from "$env/static/private";

// Uses the MONGODB_URI environment variable if it exists, otherwise uses the local database
// My vercel env is set to MONGODB_URI
const url = MONGODB_URI || "mongodb://127.0.0.1:27017/dev-forum";

const client = new MongoClient(url);

await client.connect();
const db = client.db("dev-forum");
export default db;
