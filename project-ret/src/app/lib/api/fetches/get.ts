import { ClientSession, MongoClient } from "mongodb";
import { connectToCluster, disconnectFromCluster, startSession } from "../../mongodb";
import ApiError from "../../errors/errorApi";
import { userFilter } from "../models/models";

interface GetCollectionStructure {
    getAllCollectionItems: (collectionName: string) => Promise<Response>;
    getCollectionItemsByFilter: (collectionName: string, param: userFilter) => Promise<Response>;
    getCollection: (collectionName: string) => Promise<Response>;
    getCollectionCount: (collectionName: string) => Promise<Response>;
}

export class GetCollection implements GetCollectionStructure {

    private clientPromise: Promise<MongoClient>;
    private session: ClientSession | null = null;
    private dbName: string = process.env.DB_NAME as string;
    
    constructor() {
        this.clientPromise =  connectToCluster();
    }

    private async ensureSession() {
        if (!this.session) {
            this.session = await startSession();
        }
        return this.session;
    }

    public async disconnect() {
        try {
            if (this.session) {
                this.session.endSession();
            }
            await disconnectFromCluster();
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
        }
    }

    public async getAllCollectionItems(collectionName: string): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.db(this.dbName).collection(collectionName);
            const response = await collection?.find({}).toArray();
            return Response.json(response);
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }
    public async getCollectionItemsByFilter(collectionName: string, param: userFilter): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.db(this.dbName).collection(collectionName);
            const response = await collection?.find(param).toArray();
            return Response.json(response);
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }
    public async getCollection(collectionName: string): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.db(this.dbName).collection(collectionName);
            return Response.json({ collection: collection });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }
    public async getCollectionCount(collectionName: string): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.db(this.dbName).collection(collectionName);
            const response = await collection?.countDocuments();
            return Response.json({ count: response });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }
}