//require('dotenv').config({ path: '.env.test' });
import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

export const development = {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB || 'mabc_cv',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    dialect: 'postgres',
    logging: true
};
export const test = {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_TEST || 'mabc_cv_test',
    host: process.env.HOST_TEST || 'localhost',
    port: process.env.PORT_TEST || 5433,
    dialect: 'postgres',
    logging: false
};
export const production = {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB || 'mabc_cv',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    dialect: 'postgres',
    logging: false
}; 