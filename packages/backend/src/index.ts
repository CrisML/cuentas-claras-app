import express from 'express';
import { login } from './auth/login';
import spendings from './routes/spending';
import home from './routes/home';
import cors from 'cors';
import {signup} from "./auth/signup";

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:3001',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Esta opción es necesaria si tu frontend necesita enviar cookies con las solicitudes
}));
app.use(express.json());

app.post('/api/login', login);
app.post('/api/signup', signup);
app.use('/api/groups/spendings', spendings);
app.use('/', home);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
