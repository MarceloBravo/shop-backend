'use strict';
import Sequelize from 'sequelize';
import { createRequire } from 'module';


const env = process.env.NODE_ENV || 'development';

const db = {};
let sequelize;

export async function loadModelsAndRelations() {
  if (process.env.NODE_ENV === 'test') {
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
