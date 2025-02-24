import { ClientSession, Db } from "mongodb";
import { connectToDB, disconnectFromCluster } from "@/app/lib/mongodb";
import ApiError from "@/app/api/errors/errorApi";

interface PostCollectionStructure {
    insertOne: (collectionName: string, document: object) => Promise<Response>;
    insertMany: (collectionName: string, documents: Array<object>[]) => Promise<Response>;
}

export class PostCollection implements PostCollectionStructure {

    private clientPromise: Promise<Db>;
    private session: ClientSession | null = null;
    private dbName: string = process.env.DB_NAME as string;

    constructor() {
        this.clientPromise = connectToDB();
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

    public async insertOne(collectionName: string, document: object): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.collection(collectionName);
            const response = await collection?.insertOne(document);
            console.log(`Inserted one document into the collection ${collectionName}`);
            return Response.json({ insertedData: response });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }

    public async insertMany(collectionName: string, documents: Array<object>[]): Promise<Response> {
        try {

            const client = await this.clientPromise;
            const collection = client?.collection(collectionName);
            const response = await collection?.insertMany(documents,);
            console.log(`Inserted many documents into the collection ${collectionName}`);
            return Response.json({ insertedData: response });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }
}