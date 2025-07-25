import dotenv from 'dotenv';
import Sequelize from 'sequelize';

// Configurar dotenv según el entorno - DEBE IR PRIMERO
const nodeEnv = process.env.NODE_ENV?.trim() || 'development';

//if (nodeEnv === 'test') {
//    dotenv.config({ path: './.env.test' });
//} else {
dotenv.config({ path: './.env' });
//}

const dbName = nodeEnv === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME;
const dbUser = nodeEnv === 'test' ? process.env.DB_USER_TEST : process.env.DB_USER;
const dbPass = nodeEnv === 'test' ? process.env.DB_PASS_TEST : process.env.DB_PASS;
const dbHost = nodeEnv === 'test' ? process.env.DB_HOST_TEST : process.env.DB_HOST;
const dbPort = nodeEnv === 'test' ? process.env.DB_PORT_TEST : process.env.DB_PORT;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: nodeEnv !== 'test' ? console.log : false,
});
