import { NextRequest, NextResponse } from 'next/server'
import ApiError from '@/app/api/errors/errorApi'
import { GetCollection } from '../fetches/get'
import { userFilter, userModel } from '../models/models'
import { PostCollection } from '../fetches/post'
import { Binary } from 'mongodb'
import { deleteItem } from '../fetches/delete'
import { updateItem } from '../fetches/update'

interface userControllerModel {
    getAllUsers: () => Promise<Response>
    getUserByFilter: (request: NextRequest) => Promise<Response>
    insertOneUser: (request: Request) => Promise<Response>
    insertManyUsers: (request: NextRequest) => Promise<Response>
}

export class userController implements userControllerModel {
    private getCollection = new GetCollection();
    private postCollection = new PostCollection();
    private deleteCollectionItem = new deleteItem();
    private updateCollectionItem = new updateItem();
    private extractQueryParams(searchParams: URLSearchParams) {
        const userData: userFilter = {};

        if (searchParams.has('username')) {
            userData.username = searchParams.get('username')!;
        }
        if (searchParams.has('email')) {
            userData.email = searchParams.get('email')!;
        }
        if (searchParams.has('password')) {
            userData.password = searchParams.get('password')!;
        }
        if (searchParams.has('role')) {
            userData.role = searchParams.get('role')!;
        }
        if (searchParams.has('access')) {
            userData.access = Number(searchParams.get('access'));
        }

        return userData;
    }
    constructor() {

    }
    public async getAllUsers() {
        try {
            const response = await this.getCollection.getAllCollectionItems('users');
            return response;
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        }
        finally {
            await this.getCollection.disconnect();
        }
    }
    public async getUserByFilter(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams;
        const params = this.extractQueryParams(searchParams);
        try {
            if (Object.keys(params).length === 0) {
                return NextResponse.json({ result: 'No user found' }, { status: 404 });
            }
            const response = await this.getCollection.getCollectionItemsByFilter('users', params);
            return response
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        }
        finally {
            await this.getCollection.disconnect();
        }
    }
    public async insertOneUser(request: Request) {

        try {
            const body = await request.json();
            const document: userModel = {
                username: body.username as string,
                password: body.password as string,
                email: body.email as string,
                roleAccess: {
                    role: body.role as string,
                    access: body.access as number
                },
                avatar: {
                    filename: body.filename as string,
                    type: body.type as string,
                    data: body.data as Binary
                }
            }
            this.postCollection.insertOne('users', document)
            return NextResponse.json({ insertedData: 'Success data added' }, { status: 201 });
        }
        catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        }
        finally {
            await this.postCollection.disconnect();
        }
    }
    public async insertManyUsers(request: NextRequest) {
        const body = await request.json()
        try {
            if (!Array.isArray(body)) {
                throw new Error('Body must be an array of documents');
            }
            await this.postCollection.insertMany('users', body);

            return NextResponse.json({ insertedData: 'Success data added' }, { status: 201 });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        } finally {
            await this.postCollection.disconnect();
        }
    }
    public async delete(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams;
        const idItem = (searchParams.get('_id')) as string;
        const params = this.extractQueryParams(searchParams);
        try {
            this.deleteCollectionItem.delete("users", { idItem, params })
            return NextResponse.json({ insertedData: 'Success data deleted' }, { status: 201 });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        } finally {
            await this.deleteCollectionItem.disconnect();
        }
    }
    public async update(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams;
        const idItem = searchParams.get('_id')
        const params = this.extractQueryParams(searchParams);
        try {
            this.updateCollectionItem.update("users", idItem as string, params)
            return NextResponse.json({ insertedData: 'Success data deleted' }, { status: 201 });
        } catch (e) {
            if (e instanceof Error) {
                console.error(ApiError.internalServerError(e.message));
            }
            return NextResponse.error();
        } finally {
            await this.updateCollectionItem.disconnect();
        }
    }
}