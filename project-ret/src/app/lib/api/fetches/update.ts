import { ClientSession, MongoClient } from "mongodb";
import { connectToCluster, disconnectFromCluster, startSession } from "../../mongodb";
import ApiError from "../../errors/errorApi";

interface UpdateStructure {
    update: (collectionName: string, paramId: string, updateRequest: object) => Promise<Response>;
}

export class updateItem implements UpdateStructure {

    private clientPromise: Promise<MongoClient>;
    private session: ClientSession | null = null;
    private dbName: string = process.env.DB_NAME as string;

    constructor() {
        this.clientPromise = connectToCluster();
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

    public async update(collectionName: string, paramId: string, updateRequest: object): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.db(this.dbName).collection(collectionName);
            const response = await collection.findOneAndUpdate({ paramId }, updateRequest);
            return Response.json({ updatedData: response });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }

}