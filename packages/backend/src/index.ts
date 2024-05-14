import express, { NextFunction, Request, Response } from 'express';
import { login } from './auth/login';
import home from './routes/home';
import cors from 'cors';
import {signup} from "./auth/signup";
import groupsRouter from './routes/groups';


const app = express();
const PORT = process.env.PORT || 3000;

// Config
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Esta opción es necesaria si tu frontend necesita enviar cookies con las solicitudes
}));
app.use(express.json());

// Routes
app.post('/api/login', login);
app.post('/api/signup', signup);
// app.use('/api/groups/savings', spendings);
app.use('/api/groups', groupsRouter);
app.use('/', home);

// Errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send({ details: err.message });
  });

  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
