import { ClientSession, Db } from "mongodb";
import { connectToDB, disconnectFromCluster } from "@/app/lib/mongodb";
import ApiError from "@/app/api/errors/errorApi";

interface DeleteStructure {
    delete: (collectionName: string, paramId: object) => Promise<Response>;
}

export class deleteItem implements DeleteStructure {

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

    public async delete(collectionName: string, paramId: object): Promise<Response> {
        try {
            const client = await this.clientPromise;
            const collection = client?.collection(collectionName);
            const response = await collection?.findOneAndDelete({paramId});
            return Response.json({ deletedData: response });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
                return Response.json({ error: e.message }, { status: 500 });
            }
            return Response.json({ error: "Unknown error" }, { status: 500 });
        }
    }

}