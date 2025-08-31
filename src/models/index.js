'use strict';
import { createRequire } from "module";
import path from 'path';
import { sequelize } from '../../config/database.js';
import { defineRelations } from './relations.js';
import fs from "fs";



const initializeDatabase = () => {
  const url = path.join(process.cwd(), 'src', 'models')
  const require = createRequire(url);
  const db = {};

  db.sequelize = sequelize;
  db.Sequelize = sequelize.Sequelize;
  
  const modelFiles = fs.readdirSync(url)
    .filter(file => file.endsWith(".js") &&
    file !== 'index.js' &&
    file !== 'relations.js' &&
    file.slice(-8) === 'Model.js' // Asegurarse de que solo carga archivos de modelo
  );

  
  for (const file of modelFiles) {
    const module = require(path.join(process.cwd(), "src/models", file));
    const modelName = file.replace(".js", "");
    db[modelName] = module[modelName];
  }
  
  defineRelations(db);

  return db;
};

const dbPromise = initializeDatabase();

export default dbPromise;