import { sequelize, waitForDb } from '../config/database.js';

// Importa los seeders necesarios
import rolSeeder from '../seeders/20250327121711-rol-seeder.js';
import usuarioSeeder from '../seeders/20250327124254-usuario-seeder.js';
// Importa todos los modelos explícitamente para que sequelize los registre
/*
import '../src/models/AccionesPantallaModel.js';
import '../src/models/AtributosModel.js';
import '../src/models/AtributosProductoModel.js';
import '../src/models/CategoriaModel.js';
import '../src/models/ColorModel.js';
import '../src/models/ColorProductoModel.js';
import '../src/models/DimensionesProductoModel.js';
import '../src/models/GeneroModel.js';
import '../src/models/MarcaModel.js';
import '../src/models/MaterialModel.js';
import '../src/models/MaterialProductoModel.js';
import '../src/models/MenuModel.js';
import '../src/models/MenuTiendaModel.js';
import '../src/models/PantallaModel.js';
import '../src/models/PesoProductoModel.js';
import '../src/models/ProductoModel.js';
import '../src/models/relations.js';
import '../src/models/RolModel.js';
import '../src/models/RolPermisosModel.js';
import '../src/models/SubCategoriaModel.js';
import '../src/models/TallaLetraModel.js';
import '../src/models/TallaLetraProductoModel.js';
import '../src/models/TallaNumericaModel.js';
import '../src/models/TallaNumericaProductoModel.js';
import '../src/models/TipoDimensionesModel.js';
import '../src/models/UsuarioModel.js';
import '../src/models/ValoracionProductoModel.js';
*/

export default async () => {
  await waitForDb();
  console.log('Iniciando sincronización de la base de datos');
  await sequelize.sync({alter: true});
  console.log('Limpiando todas las tablas antes de los tests...');
  // Desactiva restricciones de FK temporalmente
  await sequelize.query('SET session_replication_role = replica;');

  // Obtiene todos los nombres de tablas del esquema público, excluyendo SequelizeMeta
  const result = await sequelize.query(`
    SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename != 'SequelizeMeta';
  `);
  const tables = result[0].map(row => `"${row.tablename}"`).join(', ');
  if (tables.length > 0) {
    // Trunca todas las tablas en cascada y reinicia los IDs
    await sequelize.query(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE;`);
  }

  // Reactiva restricciones de FK
  await sequelize.query('SET session_replication_role = DEFAULT;');

  // Ejecuta los seeders necesarios para los tests
  await rolSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
  await usuarioSeeder.up(sequelize.getQueryInterface(), sequelize.constructor);
};