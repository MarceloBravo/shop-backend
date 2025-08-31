import { default as dbPromise } from '../src/models/index.js';

export default async () => {
  console.log('Iniciando teardown...');
  try {
    delete global.testToken;
    // Cerrar servidor
    if (global.__TEST_SERVER__) {
      await new Promise(resolve => global.__TEST_SERVER__.close(resolve));
      console.log('Servidor de prueba cerrado.');
    }

    // Cerrar conexión a la base de datos
    const db = dbPromise;
    if (db && db.sequelize) {
      await db.sequelize.close();
      console.log('Conexión de base de datos cerrada.');
    }
  } catch (error) {
    console.error('Error durante el teardown:', error);
    process.exit(1);
  }
  console.log('Teardown completado.');
};