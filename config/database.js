import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import Sequelize from 'sequelize';

const dbName = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB;
const dbUser = process.env.NODE_ENV === 'test' ? process.env.DB_USER : process.env.DB_USER;
const dbPass = process.env.NODE_ENV === 'test' ? process.env.DB_PASS : process.env.DB_PASS;
const dbHost = process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST;
const dbPort = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;

export const sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: 'postgres',
    logging: process.env.NODE_ENV !== 'test' ? console.log : false,
});
