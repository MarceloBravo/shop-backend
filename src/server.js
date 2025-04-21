import cors from 'cors';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';

import '../models/index.js';

const __filename = fileURLToPath(import.meta.url);

import '../models/relations.js';

import loginRoutes from './routes/login.routes.js';
import color from './routes/color.routes.js';
import categoria from './routes/categoria.routes.js';
import marca from './routes/marca.routes.js';

const __dirname = path.dirname(__filename);
const app = express();


app.use(cors());
app.use(express.json()); // Para procesar JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.set('host','127.0.0.1');
app.set('port', process.env.APP_PORT || 3000);

app.use(loginRoutes); 
app.use(color); 
app.use(categoria);
app.use(marca);


try{
    await sequelize.sync({alter: true});    //force
    console.log('Conexión establecida con la base de datos...');
    //app.listen(app.get('port'), '0.0.0.0',() => { //heroku
    if (process.env.NODE_ENV !== 'test') {  //En modo de prueba no se necesita estar escuchando a un puerto de red
        server = app.listen(app.get('port'), app.get('host'),() => {    
            console.log(`Servidor nodemon activo en ${app.get('host')}:${app.get('port')}`);
        });
    }
    
}catch(e){  
    console.log(e.message);
}


export default app;