'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('roles',[
      {
        nombre: 'Admin',
      },
      {
        nombre: 'Cliente',
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
