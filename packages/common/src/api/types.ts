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
