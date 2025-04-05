import cors from 'cors';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { sequelize } from '../config/database.js';

import '../models/index.js';
/*
import '../models/RolModel.js';
import '../models/UsuarioModel.js';
import '../models/PantallaModel.js';
import '../models/AccionesPantallaModel.js';
import '../models/RolPermisosModel.js';
import '../models/TiendaMenuModel.js';
import '../models/AdminMenuModel.js';
import '../models/CategoriaModel.js';
import '../models/SubCategoriaModel.js';
import '../models/MarcaModel.js';
import '../models/TallaLetraModel.js';
import '../models/TallaLetraProductoModel.js';
import '../models/TallaNumericaModel.js';
import '../models/TallaNumericaProductoModel.js';
import '../models/ColorModel.js';
import '../models/ColorProductoModel.js';
import '../models/MaterialModel.js';
import '../models/MaterialProductoModel.js';
import '../models/GeneroModel.js';
import '../models/AtributosProductoModel.js';
import '../models/DimensionesModel.js';
import '../models/DimensionesProductoModel.js';
import '../models/TipoDimensionesModel.js';
import '../models/ProductoModel.js';
*/
const __filename = fileURLToPath(import.meta.url);

import '../models/relations.js';

import loginRoutes from './routes/login.routes.js';

const __dirname = path.dirname(__filename);
const app = express();


app.use(cors());
app.use(express.json()); // Para procesar JSON
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

app.set('host','127.0.0.1');
app.set('port', process.env.PORT || 3000);

app.use(loginRoutes); 


try{
    await sequelize.sync({alter: true});
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