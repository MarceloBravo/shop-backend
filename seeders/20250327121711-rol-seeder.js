'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('roles',[
      {
        nombre: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Cliente',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('roles', null, {});
  }
};
