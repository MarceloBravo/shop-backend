import dbPromise from '../src/models/index.js';
import { runSeeders } from './run-seeders.js';
import getModelsInOrder from '../src/shared/getModelsInOrder.js';
  
async function runMigrateSeeders() {
    try {
        console.log('Iniciando migraciones y seeders...');
        const db = await dbPromise;

        // Crea el schema si no existe, para mayor robustez
        await db.sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${db.sequelize.options.schema}"`);

        console.log('Determinando dinámicamente el orden de creación de tablas...');
        const orderedModelNames = getModelsInOrder(db,db.Sequelize.Model);
        console.log('Orden de sincronización determinado:', orderedModelNames.join(' -> '));

        // Primero, eliminamos todas las tablas para asegurar un estado limpio.
        console.log('Eliminando todas las tablas existentes...');
        await db.sequelize.drop();
        console.log('Tablas eliminadas correctamente.');

        // Luego, creamos las tablas una por una en el orden correcto.
        for (const modelName of orderedModelNames) {
            console.log(`Creando tabla para el modelo: ${modelName}`);
            await db[modelName].sync();
        }
        console.log('Base de datos sincronizada correctamente.');

        console.log('Poblando la base de datos con seeders...');
        await runSeeders(db.sequelize);
        console.log('Base de datos poblada correctamente.');
        
        console.log('Migraciones y seeders completados con éxito. 🚀');
    } catch (error) {
        console.error('Error al ejecutar migraciones y seeders:', error);
        process.exit(1);
    }
    return db;
}

runMigrateSeeders();
