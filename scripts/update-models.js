// scripts/generate-model-index.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelsDir = path.join(__dirname, "../src/models");

const files = fs
  .readdirSync(modelsDir)
  .filter(
    (file) =>
      file.endsWith("Model.js") &&
      file !== "index.js" &&
      file !== "relations.js"
  );

let imports = "";
let assigns = "";

// Generar imports y asignaciones
for (const file of files) {
  const baseName = path.basename(file, ".js"); // Ej: RolModel
  imports += `import ${baseName} from './${file}';\n`;
  assigns += `  db.${baseName} = ${baseName};\n`;
}

// Plantilla final
const output = `\
'use strict';
import { sequelize } from '../../config/database.js';
import { defineRelations } from './relations.js';

${imports}
const initializeDatabase = () => {
  const db = {};
  db.sequelize = sequelize;
  db.Sequelize = sequelize.Sequelize;

${assigns}
  defineRelations(db);
  return db;
};

const db = initializeDatabase();
export default db;
`;

// Sobrescribir el archivo index.js
fs.writeFileSync(path.join(modelsDir, "index.js"), output);

console.log("✅ src/models/index.js generado correctamente.");
