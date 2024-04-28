import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your_secret_key_here'; // Asegúrate de mantener esta clave en un lugar seguro y no hardcodeada en producción

export const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log('Se recibe email: ', email, 'password:', password)

    // Credenciales hardcodeadas para fines de demostración
    const hardcodedUser = {
        email: 'admin@admin.com',
        password: 'admin'
    };

    // Verificar si las credenciales son correctas
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
        const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email and password' });
    }
};
