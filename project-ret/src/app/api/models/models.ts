import { Binary } from "mongodb";

export type roleAccess = {
    role: string,
    access: number
}

type avatar = {
    filename?: string,
    type?: string,
    data?: Binary
}

export type userModel = {
    username: string,
    email: string,
    password: string,
    roleAccess: roleAccess,
    avatar: avatar | null
};


export interface userFilter {
    username?: string;
    email?: string;
    password?: string;
    role?: string;
    access?: number;
}

export type manyUsersModel = userModel[];


