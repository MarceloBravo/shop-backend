const { sequelize } = require('../config/database.js');

module.exports = async () => {
  await sequelize.close();
  console.log('Database connection closed.');
};