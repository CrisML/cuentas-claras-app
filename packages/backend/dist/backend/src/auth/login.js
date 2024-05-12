"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crud = __importStar(require("../services/crud"));
exports.SECRET_KEY = 'your_secret_key_here'; // Asegúrate de mantener esta clave en un lugar seguro y no hardcodeada en producción
const login = async (req, res) => {
    const userInfo = req.body;
    console.log('Se recibe email: ', userInfo.email, 'password:', userInfo.password);
    // Verificar si las credenciales son correctas
    const usuarioEncontrado = await crud.getUser(userInfo);
    if (usuarioEncontrado) {
        const username = userInfo.email;
        const token = jsonwebtoken_1.default.sign({ username }, exports.SECRET_KEY, { expiresIn: '1h' });
        const response = { token };
        res.json(response);
    }
    else {
        res.status(401).json({ message: 'Invalid email and password' });
    }
};
exports.login = login;
