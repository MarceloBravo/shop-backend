'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('pantallas', [
      {
        nombre: 'Home',
        uri: '/admin/home',
      },
      {
        nombre: 'Roles',
        uri: '/admin/roles',
      },
      {
        nombre: 'Usuarios',
        uri: '/admin/usuarios',
      },
      {
        nombre: 'Pantallas',
        uri: '/admin/pantallas',
      },
      {
        nombre: 'Menús',
        uri: '/admin/menus',
      },
      {
        nombre: 'Permisos',
        uri: '/admin/permisos',
      }
      ], {});
    },

    async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('pantallas', null, {});
    }
};
