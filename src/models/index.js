/*
'use strict';
import Sequelize from 'sequelize';
import { createRequire } from 'module';


const env = process.env.NODE_ENV || 'development';

const db = {};
let sequelize;

export async function loadModelsAndRelations() {
  if (env === 'test') {
    // En tests, puedes importar solo los modelos necesarios o mockear
    return db;
  }

  sequelize = new Sequelize(config.database, config.username, config.password, config);
  db.sequelize = sequelize;

  const { readdirSync } = await import('fs');
  const files = readdirSync(new URL('.', import.meta.url))
    .filter(file =>
      file !== 'index.js' &&
      file !== 'relations.js' &&
      file.substring(file.length - 3) === '.js'
    );

  for (const file of files) {
    const modulePath = new URL(`./${file}`, import.meta.url);
    const modelName = file.substring(0, file.length - 3);
    const { [modelName]: model } = await import(modulePath);
    db[modelName] = model;
  }

  // Importa y ejecuta las relaciones después de cargar los modelos
  const { defineRelations } = await import('./relations.js');
  defineRelations(db);

  return db;
}

export default db;
*/

'use strict';
import Sequelize from 'sequelize';
import { readdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import config from '../../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let db = {};

const initializeDatabase = async () => {
  const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;

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
    const model = module.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  // Cargar relaciones
  const { default: defineRelations } = await import(path.toNamespacedPath(path.join(__dirname, 'relations.js')));
  defineRelations(sequelize);


  return db;
};

const dbPromise = initializeDatabase();

export default dbPromise;