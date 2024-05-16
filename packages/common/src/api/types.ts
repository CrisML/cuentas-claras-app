import { ObjectId} from 'mongodb';

export interface LoginRequest {
    _id?: ObjectId;
    username: string;
    password: string;
}

export interface CreateGroupRequest {
    /*token: string;*/
    name: string;
}

export interface LoginResponse {
    token?: string;
    message?: string;
}

export interface SignupRequest {
    username: string;
    password: string;
}

export interface SignupResponse {
    token?: string;
    message?: string;
}

export interface Group {
    name: string;
    type: string;
    members: Member[];
}

export interface Member {
    user_id: string;
    username: string;
}

export interface Spending {
    user_id: string;
    description: string;
    amount: number;
}