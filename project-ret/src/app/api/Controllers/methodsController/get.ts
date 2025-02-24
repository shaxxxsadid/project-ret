import { Db } from "mongodb";
import { connectToDB, } from "@/app/lib/mongodb";
import ApiError from "@/app/api/errors/errorApi";
import { userFilter } from "@/app/api/models/models";

interface GetCollectionStructure {
    getAllCollectionItems: (collectionName: string) => Promise<Response>;
    getCollectionItemsByFilter: (collectionName: string, param: userFilter) => Promise<Response>;
    getCollection: (collectionName: string) => Promise<Response>;
    getCollectionCount: (collectionName: string) => Promise<Response>;
}

export class GetCollection implements GetCollectionStructure {

    private static dbPromise: Promise<Db>;
    constructor() {
        if (!GetCollection.dbPromise) {
            GetCollection.dbPromise = connectToDB();
        }
    }

    private async getDb(): Promise<Db> {
        return GetCollection.dbPromise;
    }

    public async getAllCollectionItems(collectionName: string): Promise<Response> {
        try {
            const db = await this.getDb();
            const collection = db.collection(collectionName);
            const response = await collection.find({}).toArray();
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
            const db = await this.getDb();
            const collection = db.collection(collectionName);
            const response = await collection.find(param).toArray();
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
            const db = await this.getDb();
            const collection = db.collection(collectionName);
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
            const db = await this.getDb();
            const collection = db.collection(collectionName);
            const response = await collection.countDocuments();
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