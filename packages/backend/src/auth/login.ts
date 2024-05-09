import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {LoginRequest, LoginResponse} from "@common/api/types";
import {collections} from "../services/database"
export const SECRET_KEY = 'your_secret_key_here'; // Asegúrate de mantener esta clave en un lugar seguro y no hardcodeada en producción

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginRequest
    console.log('Se recibe email: ', email, 'password:', password)
    // Verificar si las credenciales son correctas
    const usuarioEncontrado = (await collections.users?.findOne<LoginRequest>({email: email, password: password})) as LoginRequest;
    if (usuarioEncontrado) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        const response: LoginResponse = {token}
        res.json(response)
    } else {
        res.status(401).json({ message: 'Invalid email and password' });
    }
};
