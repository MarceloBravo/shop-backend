'use strict';

import { readdirSync } from 'fs';
import Sequelize from 'sequelize';

const env = process.env.NODE_ENV || 'development';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const config = require('../config/config.json')[env];

const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);


const files = readdirSync(new URL('.', import.meta.url))
.filter(file =>
  file !== 'index.js' &&
  file !== 'index copy.js' &&
  file !== 'relations.js' &&
  file.substring(file.length - 3) === '.js'
);

for (const file of files) {
  const modulePath = new URL(`./${file}`, import.meta.url);
  const modelName = file.substring(0,file.length - 3);
  const { [modelName]: model } = await import(modulePath);
  db[modelName] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
