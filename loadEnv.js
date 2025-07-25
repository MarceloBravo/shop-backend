import dotenv from 'dotenv';

import path from 'path';

// Carga el archivo .env desde la raíz del proyecto
dotenv.config({ path: path.resolve(process.cwd() +'/.env') });
