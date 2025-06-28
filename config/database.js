import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import Sequelize from 'sequelize'

/*
const HOST = 'localhost'
const HOST_TEST = 'localhost'
const PORT = '5433' 
const PORT_TEST = '5433'
const DB = 'mabc_cv'
const DB_TEST = 'mabc_cv_test'
const pwd = '123456'
*/

const conect = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB
const host = process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT
console.log('Conectando a la base de datos:', conect, host, port);
export const sequelize = new Sequelize(conect,'postgres',process.env.PWD.toString(),{
    host: host,
    port: port,
    dialect: 'postgres'
})
