import dbPromise from '../src/models/index.js';
import { runSeeders } from './run-seeders.js';

async function runMigrateSeeders() {
    try {
        console.log('Iniciando migraciones y seeders...');
        const db = await dbPromise;
        await db.sequelize.sync({force: true, schema: process.env.DB_NAME }); 
        console.log('Base de datos sincronizada correctamente.');

        console.log('Poblando la base de datos con seeders...');
        await runSeeders(db.sequelize)
        console.log('Base de datos poblada correctamente.');
        
        console.log('Migraciones y seeders completados con éxito. 🚀');
    }catch (error) {
        console.error('Error al ejecutar migraciones y seeders:', error);
        process.exit(1);
    }
}

runMigrateSeeders();