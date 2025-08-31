import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rutas from '../src/routes/rutas.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
const API_PREFIX = '/api/v1';

rutas.forEach(({ path, router }) => {
    app.use(`${API_PREFIX}${path}`, router);
});

export default app;