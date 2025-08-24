'use strict';
import path from 'path';
import { readdir } from 'fs/promises';
import { sequelize } from '../../config/database.js';

const initializeDatabase = async () => {
  const __dirname = path.join(process.cwd(), 'src', 'models');

  let db = {};

  db.sequelize = sequelize;
  db.Sequelize = sequelize.Sequelize;
  const files = await readdir(__dirname);

  const modelFiles = files.filter(file =>
    file.indexOf('.') !== 0 &&
    file !== 'index.js' &&
    file !== 'relations.js' &&
    file.slice(-8) === 'Model.js' // Asegurarse de que solo carga archivos de modelo
  );

  for (const file of modelFiles) {
    const modelPath = path.join(__dirname, file);
    const module = await import(path.toNamespacedPath(modelPath));
    const modelName = file.replace('.js', '');
    const model = module[modelName];
    db[modelName] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Cargar relaciones
  //const { defineRelations } = await import(path.toNamespacedPath(path.join(__dirname, 'relations.js')));
  const { defineRelations } = await import(path.join(__dirname, 'relations.js'));
  defineRelations(db);


  return db;
};

const dbPromise = initializeDatabase();

export default dbPromise;