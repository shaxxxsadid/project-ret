import { MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.DB_URL as string;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
};
const client = new MongoClient(uri, options);
const db = client.db(process.env.DB_NAME);
export async function connectToDB() {
  try {
    await client.connect();
    return db;
  } catch (error) {
    await client.close();
    throw new Error(`${error} - Failed to connect to MongoDB`);
  }
}

export async function disconnectFromCluster() {
  if (client) {
    await client.close();
    console.log('Successfully disconnected from MongoDB Atlas!');
  }
}
