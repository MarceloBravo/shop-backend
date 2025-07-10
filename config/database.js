import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });
import Sequelize from 'sequelize'

const conect = process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB
const host = process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT
//console.log('Conectando a la base de datos:', conect, host, port);
export const sequelize = new Sequelize(conect,'postgres',process.env.PWD.toString(),{
    host: host,
    port: port,
    dialect: 'postgres',
    logging: process.env.NODE_ENV !== 'test' ? console.log : false,
})
