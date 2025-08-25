// test/globalSetup.js
import getModelsInOrder from '../src/shared/getModelsInOrder.js';
import rolSeeder from '../seeders/20250327121711-rol-seeder.js';
import usuarioSeeder from '../seeders/20250327124254-usuario-seeder.js';

export default async function globalSetup() {
  if (process.env.RUN_GLOBAL_SETUP) {
    console.log('Ejecutando globalSetup para tests de integración...');
    try {
      const { app } = await import('../src/index.js');
      //const { getModelsInOrder } = await import('../helpers/getModelsInOrder.js');
      const { default: dbPromise } = await import('../src/models/index.js');
      console.log('Iniciando migraciones y seeders...');

      // Espera la conexión a la DB
      const db = await dbPromise;
      const sequelize = db.sequelize;

      // Crea el schema si no existe (útil para tests locales)
      const schemaName = process.env.DB_NAME || 'mabc_cv_test';
      await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

      console.log('Determinando dinámicamente el orden de creación de tablas...');
      const orderedModelNames = getModelsInOrder(db, sequelize.Sequelize.Model);
      console.log('Orden de sincronización determinado:', orderedModelNames.join(' -> '));

      // Elimina todas las tablas para un estado limpio
      console.log('Eliminando todas las tablas existentes...');
      await sequelize.drop({ cascade: true }); // La opción cascade elimina también las dependencias (claves foráneas)
      console.log('Tablas eliminadas correctamente.');

      // Crea las tablas en el orden correcto
      for (const modelName of orderedModelNames) {
        console.log(`Creando tabla para el modelo: ${modelName}`);
        await db[modelName].sync({ force: true });
      }
      console.log('Base de datos sincronizada correctamente.');

      // Ejecuta seeders
      console.log('Ejecutando seeders...');
      await rolSeeder.up(db.sequelize.getQueryInterface(), db.sequelize.Sequelize);
      console.log('Seeder de roles ejecutado correctamente.');
      await usuarioSeeder.up(db.sequelize.getQueryInterface(), db.sequelize.Sequelize);
      console.log('Seeder de usuarios ejecutado correctamente.');

      // Levanta el server para tests y lo guarda globalmente
      global.__TEST_SERVER__ = app.listen(0, () => {
        const port = global.__TEST_SERVER__.address().port;
        console.log(`Test server listening on port ${port}`);
      });

    } catch (e) {
      console.error('globalSetup ERROR:', e);
      throw e; // Importante para que Jest falle si hay error en setup
    }
  } else {
    console.log('Omitiendo globalSetup para tests unitarios.');
  }
}