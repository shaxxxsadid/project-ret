import { ClientSession, MongoClient, ServerApiVersion } from 'mongodb';
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
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;
let isConnectedFlag = false;

export async function connectToCluster() {
  if (isConnectedFlag) {
    console.log('Client already connected');
    return client;
  }

  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }

  try {
    await clientPromise;
    console.log('Successfully connected to MongoDB Atlas!');
    isConnectedFlag = true;
    return client;
  } catch (e) {
    console.error('Failed to connect to MongoDB Atlas:', e);
    isConnectedFlag = false;
    return client;
  }
}

export async function disconnectFromCluster() {
  try {
    await client.close();
    console.log('Successfully disconnected from MongoDB Atlas!');
    isConnectedFlag = false;
  }
  catch (e) {
    console.error(e);
  }
}

export async function startSession(): Promise<ClientSession> {
  if (!isConnected()) {
    throw new Error('Client is not connected');
  }
  return client.startSession();
}

export function isConnected(): boolean {
  return isConnectedFlag;

}