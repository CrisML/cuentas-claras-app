import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {SignupRequest, SignupResponse} from "@common/api/types";
import {collections} from "../services/database"
import {SECRET_KEY} from "./login";
import {Users} from "../models/users";

export const signup = async (req: Request, res: Response) => {
    const { email, password } = req.body as SignupRequest
    console.log('Se recibe email: ', email, 'password:', password)
    // Verificar si no existe un usuario con el mismo email
    // // Imprimo todos los usuarios
    // const usuarios = await collections.users?.find({}).toArray();
    // console.log('Usuarios:', usuarios)
    const usuarioEncontrado= await collections.users?.findOne<Users>({email: email, password: password});
    if (usuarioEncontrado) {
        res.status(400).json({ message: 'User already exists' });
    } else if (email === '' || password === '') {
        res.status(400).json({ message: 'Email and password are required' });
    }
    else {
        const result = await collections.users?.insertOne({email, password});
        if (!result) {
            res.status(500).json({ message: 'Error creating user' });
        }
        console.log('Usuario creado:', result)
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        const response: SignupResponse = {token, message: 'User created'}
        res.status(201).json(response);
    }
};
