"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = 'your_secret_key_here'; // Asegúrate de mantener esta clave en un lugar seguro y no hardcodeada en producción
const login = (req, res) => {
    const { email, password } = req.body;
    console.log('Se recibe email: ', email, 'password:', password);
    // Credenciales hardcodeadas para fines de demostración
    const hardcodedUser = {
        email: 'admin@admin.com',
        password: 'admin'
    };
    // Verificar si las credenciales son correctas
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
        const token = jsonwebtoken_1.default.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
        const response = { token };
        res.json(response);
    }
    else {
        res.status(401).json({ message: 'Invalid email and password' });
    }
};
exports.login = login;
