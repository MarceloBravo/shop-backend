import { sequelize } from '../config/database.js';
import { runSeeders } from './run-seeders.js';

async function runMigrateSeeders() {
    try {
        console.log('Iniciando migraciones y seeders...');
        await sequelize.sync({alter: true}); 
        console.log('Base de datos sincronizada correctamente.');

        console.log('Poblando la base de datos con seeders...');
        await runSeeders()
        console.log('Base de datos poblada correctamente.');
        
        console.log('Migraciones y seeders completados con éxito. 🚀');
    }catch (error) {
        console.error('Error al ejecutar migraciones y seeders:', error);
        process.exit(1);
    }
}

runMigrateSeeders();