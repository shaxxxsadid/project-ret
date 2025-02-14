import { ClientSession, MongoClient, ServerApiVersion } from 'mongodb';
import { config } from 'dotenv';

config();

const uri = process.env.DB_URL as string;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  connectTimeoutMS: 30000,
  socketTimeoutMS: 30000,

});

let isConnectedFlag = false;

export async function connectToCluster() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    console.log('Successfully connected to MongoDB Atlas!');
    isConnectedFlag = true;
    return client;
  }
  // Ensures that the client will close when you finish/error
  catch (e) {
    console.error(e);
  }
}

export async function disconnectFromCluster() {
  try {
    // Ensures that the client will close when you finish/error
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