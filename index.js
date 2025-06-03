console.log('cargando archivo src/index.js')
import './loadEnv.js';
import app from './src/server.js';

const server = app;

export { server };