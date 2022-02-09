require('dotenv').config();
const { MongoClient } = require("mongodb");
const DATA = require("./data");

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_NAME = process.env.DB_NAME;
const DB_COLLECTION_NAME = process.env.DB_COLLECTION_NAME;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.xg2y5.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db(DB_NAME);
    const collection = database.collection(DB_COLLECTION_NAME);
    // array of documents to insert
    const docs = DATA;
    // this option prevents additional documents from being inserted if one fails
    const options = { ordered: true };
    const result = await collection.insertMany(docs, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);