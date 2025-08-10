const { sequelize } = require('../config/database.js');

module.exports = async () => {
  await sequelize.close();
  console.log('Database connection closed.');

  if (global.__TEST_SERVER__) {
    await new Promise(resolve => global.__TEST_SERVER__.close(resolve));
    console.log('Test server closed.');
  }
};