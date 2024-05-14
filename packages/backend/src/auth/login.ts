import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {LoginRequest, LoginResponse} from "@common/api/types";
import * as crud from "../services/crud"
export const SECRET_KEY = 'your_secret_key_here'; // Asegúrate de mantener esta clave en un lugar seguro y no hardcodeada en producción

export const login = async (req: Request, res: Response) => {
    const userInfo = req.body as LoginRequest;

    console.log('Se recibe username: ', userInfo.username, 'password:', userInfo.password);
    // Verificar si las credenciales son correctas
    const usuarioEncontrado = await crud.getUser(userInfo);
    if (usuarioEncontrado) {
        const username = userInfo.username;
        const token = jwt.sign({username}, SECRET_KEY, { expiresIn: '1h' });
        const response: LoginResponse = {token}
        res.json(response)
    } else {
        res.status(401).json({ message: 'Invalid email and password' });
    }
};
