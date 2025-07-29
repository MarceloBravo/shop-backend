import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import rutas from './routes/rutas.js';
//import { sequelize } from '../config/database.js';

const nodeEnv = process.env.NODE_ENV?.trim() || 'development';
const app = express();

app.use(cors());
app.use(express.json()); // Para procesar JSON
app.use(morgan('dev'));

app.set('host','127.0.0.1');
const port = nodeEnv == 'test' ? process.env.APP_PORT_TEST : process.env.APP_PORT;
app.set('port', port || 3000);

// Prefijo global opcional
//const ADMIN_PREFIX = '/admin/v1';
const API_PREFIX = '/api/v1';

rutas.forEach(({ path, router }) => {
    app.use(`${API_PREFIX}${path}`, router);
});

//console.log(listEndpoints(app));

try{
    //await removeDuplicateConstraints();
    //sequelize.sync({alter: true});    //force
    //console.log('Conexión establecida con la base de datos...');
    //app.listen(app.get('port'), '0.0.0.0',() => { 
    if (process.env.NODE_ENV?.trim() !== 'test') {  //En modo de prueba no se necesita estar escuchando a un puerto de red
        server = app.listen(app.get('port'), app.get('host'),() => {    
            console.log(`Servidor nodemon activo en ${app.get('host')}:${app.get('port')}`);
        });
    }
    
}catch(e){  
    console.log(e.message);
}

export default app;