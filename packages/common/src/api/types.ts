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

export interface SpendingGroup {
    name: string;
    members: GroupMember[];
}

export interface GroupMember {
    _id: string;
    name: string;
}
