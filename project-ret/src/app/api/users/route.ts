
import { NextRequest } from "next/server";
import ApiError from "../../errors/errorApi";
import { userController } from "../Controllers/userController";

const user = new userController();
export async function GET() {
    try {
        const response = user.getAllUsers();
        return response;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
        }
        return Response.error();
    }
}

export async function POST(request: NextRequest)  {
    try {
        const response = user.insertOneUser(request);
        return response;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
            return Response.error();
        }
    }
}
export async function UPDATE(request: NextRequest)  {
    try {
        const response = user.update(request);
        return response;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
            return Response.error();
        }
    }
}
export async function DELETE(request: NextRequest)  {
    try {
        const response = user.delete(request);
        return response;
    }
    catch (e) {
        if (e instanceof Error) {
            console.error(ApiError.internalServerError(e.message));
            return Response.error();
        }
    }
}