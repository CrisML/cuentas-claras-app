import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {LoginResponse, SignupRequest, SignupResponse} from "@common/api/types";
import {collections} from "../services/database"
import {SECRET_KEY} from "./login";

export const signup = (req: Request, res: Response) => {
    const { email, password } = req.body as SignupRequest
    console.log('Se recibe email: ', email, 'password:', password)
    // Verificar si no existe un usuario con el mismo email
    const usuarioEncontrado = collections.users?.find(user => user.email === email);
    if (usuarioEncontrado) {
        res.status(400).json({ message: 'User already exists' });
    } else if (email === '' || password === '') {
        res.status(400).json({ message: 'Email and password are required' });
    }
    else {
        collections.users?.push({email, password});
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        const response: SignupResponse = {token, message: 'User created'}
        res.status(201).json(response);
    }
};
