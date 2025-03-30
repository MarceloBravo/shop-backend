'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('pantallas', [
      {
        nombre: 'Home',
        uri: '/admin/home',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Roles',
        uri: '/admin/roles',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Usuarios',
        uri: '/admin/usuarios',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Pantallas',
        uri: '/admin/pantallas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Menús',
        uri: '/admin/menus',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nombre: 'Permisos',
        uri: '/admin/permisos',
        created_at: new Date(),
        updated_at: new Date(),
      }
      ], {});
    },

    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('pantallas', null, {});
    }
};
