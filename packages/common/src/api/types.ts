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
    members: string[];
}

export interface Member {
    user_id: string;
    name: string;
}

export interface Spending {
    user_id: string;
    description: string;
    amount: number;
}