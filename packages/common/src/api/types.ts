import {ObjectId} from "mongodb"

export interface LoginRequest {
    email: string;
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
    email: string;
    password: string;
}

export interface SignupResponse {
    token?: string;
    message?: string;
}

export interface Group {
    name: string;
    type: string;
    members: ObjectId[];
}

export interface Member {
    _id: ObjectId;
    name: string;
}