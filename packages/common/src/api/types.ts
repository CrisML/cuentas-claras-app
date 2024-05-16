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
    user_id?: string; 
    message?: string;
}

export interface SignupRequest {
    username: string;
    password: string;
    name: string;
    spending_limit: number;

}

export interface SignupResponse {
    token?: string;
    user_id?: string; 
    message?: string;
}

export interface Spending {
    user_id: string;
    description: string;
    amount: number;
}

export interface Group {
    name: string;
    type: string;
    members: Member[];
    spendings: Spending[];
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