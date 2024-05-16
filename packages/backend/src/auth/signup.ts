import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {LoginRequest, SignupResponse} from "@common/api/types";
import * as crud from "../services/crud"
import {SECRET_KEY} from "./login";

export const signup = async (req: Request, res: Response) => {
    const userInfo = req.body as LoginRequest;
    console.log('Se recibe email: ', userInfo.email, 'password:', userInfo.password);
    // Verificar si no existe un usuario con el mismo email
    // // Imprimo todos los usuarios
    // const usuarios = await collections.users?.find({}).toArray();
    // console.log('Usuarios:', usuarios)
    const usuarioEncontrado = await crud.getUser(userInfo);
    if (usuarioEncontrado) {
        res.status(400).json({ message: 'User already exists' });
    } else if (userInfo.email === '' || userInfo.password === '') {
        res.status(400).json({ message: 'Email and password are required' });
    }
    else {
        const result = await crud.createUser(userInfo);
        if (!result){
            res.status(500).json({ message: 'Error creating user' });
        }
        const payload = {"email": userInfo.email, "user_id": result.insertedId.toString()};
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
        const response: SignupResponse = {token, message: 'User created'}
        res.status(201).json(response);
    }
};
