import { connectToCluster, disconnectFromCluster, isConnected, startSession } from "../../mongodb";
import ApiError from "../../errors/errorApi";

export async function GET() {
    const client = await connectToCluster();
    if (!isConnected()) {
        throw new Error('Client is not connected');
    }
    let session = startSession();

    try {
        const url = process.env.DB_URL as string;
        const nameCollection = 'users';
        const response = await client
            ?.db(process.env.DB_NAME as string)
            .collection('users')
            .find()
            .toArray()
        return Response.json({ DB_URI: url, response: response });
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
            return Response.error();
        }
    } finally {
        if (session) {
            (await session).endSession();
            await disconnectFromCluster();
        }
    }
}