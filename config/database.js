import dotenv from 'dotenv';
import Sequelize from 'sequelize';

// Configurar dotenv según el entorno - DEBE IR PRIMERO
const nodeEnv = process.env.NODE_ENV?.trim() || 'development';

dotenv.config({ path: './.env' });

let sequelize;
//console.log("DATABASE_URL:", process.env.DATABASE_URL);
//console.log("NEON_DATABASE_URL:", process.env.NEON_DATABASE_URL);
const dbName = nodeEnv === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dbUser = nodeEnv === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER;
const dbPass = nodeEnv === 'test' ? process.env.DB_PASS_TEST : process.env.DB_PASS;
const dbHost = nodeEnv === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST;
const dbPort = nodeEnv === 'test' ? process.env.DB_PORT_TEST : process.env.DB_PORT;
if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.NEON_DATABASE_URL || process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        schema: dbName,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: nodeEnv !== 'test' ? console.log : false,
        searchPath: dbName,
    });
} else {
    

    sequelize = new Sequelize(dbName, dbUser, dbPass, {
        schema: dbName,
        host: dbHost,
        port: dbPort,
        dialect: 'postgres',
        logging: nodeEnv !== 'test' ? console.log : false,
        searchPath: dbName,
    });
}

export { sequelize };