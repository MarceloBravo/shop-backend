require('dotenv').config({ path: '.env.test' });

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB || 'mabc_cv',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    dialect: 'postgres',
    logging: true
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_TEST || 'mabc_cv_test',
    host: process.env.HOST_TEST || 'localhost',
    port: process.env.PORT_TEST || 5433,
    dialect: 'postgres',
    logging: false
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB || 'mabc_cv',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5432,
    dialect: 'postgres',
    logging: false
  }
}; 