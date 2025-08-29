import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
const nodeEnv = process.env.NODE_ENV?.trim() || 'development';
const app = express();

// Inicializa modelos y relaciones antes de usar rutas
app.use(cors());
app.use(express.json()); // Para procesar JSON
app.use(morgan('dev'));

const host = process.env.NODE_ENV?.trim() === 'production' ? '0.0.0.0' : '127.0.0.1';
app.set('host', host);
const port = nodeEnv == 'test' ? process.env.APP_PORT_TEST : process.env.APP_PORT;
app.set('port', port || 3000);
/*
// Prefijo global opcional
//const ADMIN_PREFIX = '/admin/v1';
const API_PREFIX = '/api/v1';

rutas.forEach(({ path, router }) => {
    app.use(`${API_PREFIX}${path}`, router);
});
*/

export default app;
