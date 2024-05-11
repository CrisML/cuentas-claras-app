import express, { NextFunction, Request, Response } from 'express';
import { login } from './auth/login';
import spendings from './routes/spending';
import home from './routes/home';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Config
app.use(cors({
    origin: 'http://localhost:3001',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // Esta opción es necesaria si tu frontend necesita enviar cookies con las solicitudes
}));
app.use(express.json());

// Routes
app.post('/api/login', login);
app.use('/api/groups/spendings', spendings);
app.use('/', home);

// Errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).send({ details: err.message });
  });

  
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
