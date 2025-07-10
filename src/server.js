import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
//import { loadModelsAndRelations } from '../models/index.js';
import rutas from './routes/rutas.js';
//import { sequelize } from '../config/database.js';
//import { removeDuplicateConstraints } from '../scripts/remove-duplicate-indexes.js';

//import '../models/index.js';
//import '../models/relations.js';
//await loadModelsAndRelations();


//import listEndpoints from 'express-list-endpoints';
const app = express();

app.use(cors());
app.use(express.json()); // Para procesar JSON
app.use(morgan('dev'));

app.set('host','127.0.0.1');
app.set('port', process.env.APP_PORT || 3000);

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