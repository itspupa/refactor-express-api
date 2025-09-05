import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.MONGO_DB || "practice-mongo";

let client;
let db;

const connectIfNeeded = async () => {
  if (db && client) return;
  client = new MongoClient(connectionString, { useUnifiedTopology: true });
  await client.connect();
  db = client.db(dbName);
};

export const getDb = async () => {
  await connectIfNeeded();
  return db;
};

export const getClient = async () => {
  await connectIfNeeded();
  return client;
};
