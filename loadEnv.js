import dotenv from 'dotenv';
//dotenv.config();

import path from 'path';

// Carga el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(process.cwd() +'/.env') });

console.log('Variables de entorno cargadas en loadEnv.js:', process.env);