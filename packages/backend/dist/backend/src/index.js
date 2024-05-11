"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = require("./auth/login");
const spending_1 = __importDefault(require("./routes/spending"));
const home_1 = __importDefault(require("./routes/home"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Config
app.use((0, cors_1.default)({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Esta opción es necesaria si tu frontend necesita enviar cookies con las solicitudes
}));
app.use(express_1.default.json());
// Routes
app.post('/api/login', login_1.login);
app.use('/api/groups/spendings', spending_1.default);
app.use('/', home_1.default);
// Errors
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({ details: err.message });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
