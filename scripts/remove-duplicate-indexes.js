import Sequelize from 'sequelize';
//import { readdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const config = require('../src/config/config.json'); // Ajusta si usas otro archivo
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

// ⚙️ Ajusta a tu entorno (desarrollo, producción, etc.)
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

export async function removeDuplicateConstraints() {
  try {
    const constraints = await sequelize.query(
      `
      SELECT
        conname AS constraint_name,
        conrelid::regclass::text AS table_name
      FROM
        pg_constraint
      WHERE
        contype IN ('u', 'p') -- u = UNIQUE, p = PRIMARY KEY
        AND connamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
      ORDER BY
        constraint_name;
      `,
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Agrupar por nombre de constraint
    const constraintMap = {};
    for (const c of constraints) {
      if (!constraintMap[c.constraint_name]) {
        constraintMap[c.constraint_name] = [];
      }
      constraintMap[c.constraint_name].push(c);
    }
    console.log(constraintMap);
    console.log('Indices a eliminar: ' + Object.entries(constraintMap).length);
    // Eliminar duplicados (dejamos la primera)
    for (const [name, group] of Object.entries(constraintMap)) {
      //if (group.length > 1) {
        //for (let i = 1; i < group.length; i++) {
          const { table_name, constraint_name } = group[0];
          const dropSql = `ALTER TABLE "${table_name}" DROP CONSTRAINT "${constraint_name}"`;
          console.log(`Eliminando constraint duplicada: ${constraint_name} en tabla ${table_name}`);
          try {
            await sequelize.query(dropSql);
          } catch (err) {
            console.error(`❌ Error al eliminar constraint ${constraint_name} en tabla ${table_name}:`, err.message);
          }
        //}
      //}
    }

    console.log('✅ Proceso terminado');
    await sequelize.close();
  } catch (err) {
    console.error('❌ Error general:', err);
    await sequelize.close();
  }
}

//removeDuplicateConstraints();
