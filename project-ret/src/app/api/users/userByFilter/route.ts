import ApiError from "@/app/api/errors/errorApi";
import { userController } from "../../Controllers/userController";
import { NextRequest } from "next/server";

const user = new userController();

export async function GET(request: NextRequest) {
    try {
        const response = user.getUserByFilter(request);
        return response;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
        }
        return Response.error();
    }
}

export async function POST(request: NextRequest) {
    try {
        return user.insertManyUsers(request);
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
            return Response.error();
        }
    }
}