import Sequelize from 'sequelize'

//console.log(process.env.DB_TEST, 'process.env =>',process.env);
/*
const HOST = 'localhost'
const HOST_TEST = 'localhost'
const PORT = '5433' 
const PORT_TEST = '5433'
const DB = 'mabc_cv'
const DB_TEST = 'mabc_cv_test'
const pwd = '123456'
*/

export const sequelize = new Sequelize(process.env.NODE_ENV === 'test' ? process.env.DB_TEST : process.env.DB,'postgres',process.env.PWD.toString(),{
    host: process.env.NODE_ENV === 'test' ? process.env.HOST_TEST : process.env.HOST,
    port: process.env.NODE_ENV === 'text' ? process.env.PORT_TEST : process.env.PORT,
    dialect: 'postgres'
})
