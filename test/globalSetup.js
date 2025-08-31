import db from '../src/models/index.js';
import getModelsInOrder from '../src/shared/getModelsInOrder.js';
import rolSeeder from '../seeders/20250327121711-rol-seeder.js';
import usuarioSeeder from '../seeders/20250327124254-usuario-seeder.js';
import app from './appTest.js';
import { TestAuthHelper } from './integration/helpers/TestAuthHelper.js';

export default async function globalSetup() {
  if(process.env.RUN_GLOBAL_SETUP === undefined) return;
  try {    
    console.log('Iniciando globalSetup...');
    
    await sincronizarBaseDeTados(db);
    
    await cargarSeeders(db);

    await levantarServidor();

    await obtenerToken();
    
  } catch (e) {
    console.error('globalSetup ERROR:', e);
    throw e; // importante para que Jest falle si hay error
  }
}

const sincronizarBaseDeTados = async (db) => {
  const sequelize = db.sequelize;

  // Schema de test
  const schemaName = process.env.DB_NAME_TEST || 'mabc_cv_test';
  console.log(`Usando schema: ${schemaName}`);

  // Crear schema si no existe
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

  // Asignar schema dinámicamente a todos los modelos
  for (const modelName of Object.keys(sequelize.models)) {
    const model = sequelize.models[modelName];
    model._schema = schemaName;       // interno Sequelize
    model.options.schema = schemaName; // afecta sync / queries
  }



  // Determinar orden de creación de tablas según FK
  const orderedModelNames = getModelsInOrder(db, sequelize.Sequelize.Model);
  console.log('Orden de sincronización:', orderedModelNames.join(' -> '));

  // Sincronizar tablas en orden correcto, vacías
  for (const modelName of orderedModelNames) {
    console.log(`Sincronizando modelo: ${modelName}`);
    await db[modelName].sync({ force: true });
  }

  console.log('Base de datos sincronizada correctamente en estado vacío.');
}

const cargarSeeders = async (db) => {
  // Ejecuta seeders
  console.log('Ejecutando seeders...');
  await rolSeeder.up(db.sequelize.getQueryInterface(), db.sequelize.Sequelize);
  console.log('Seeder de roles ejecutado correctamente.');
  await usuarioSeeder.up(db.sequelize.getQueryInterface(), db.sequelize.Sequelize);
  console.log('Seeder de usuarios ejecutado correctamente.');

  
}

const levantarServidor = async () => {
  //const { app } = await import('../src/index.js');
  // Levanta el server para tests y lo guarda globalmente
  global.__TEST_SERVER__ = app.listen(0, () => {
    const port = global.__TEST_SERVER__.address().port;
    console.log(`Test server listening on port ${port}`);
  });
} 

const obtenerToken = async () => {
  const token = await TestAuthHelper.createUserAndLogin();
  if(!token) throw new Error('No se pudo obtener el token');
  global.testToken = token;
}