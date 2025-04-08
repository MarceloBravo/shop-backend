'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('menus', [
      {
       nombre: 'Home',
       icono: null,
       menu_padre_id: null,
       uri: '/admin/home',
       posicion: 10,
       pantalla_id: 1,
       created_at: new Date(),
       updated_at: new Date()
     },
     {
      nombre: 'Configuración',
      icono: null,
      menu_padre_id: null,
      uri: '/admin/config',
      posicion: 100,
      pantalla_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
     {
      nombre: 'Roles',
      icono: null,
      menu_padre_id: 100,
      uri: '/admin/roles',
      posicion: 10,
      pantalla_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
     {
      nombre: 'Usuarios',
      icono: null,
      menu_padre_id: 100,
      uri: '/admin/usuarios',
      posicion: 20,
      pantalla_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
     {
      nombre: 'Pantallas',
      icono: null,
      menu_padre_id: 100,
      uri: '/admin/pantallas',
      posicion: 30,
      pantalla_id: 4,
      created_at: new Date(),
      updated_at: new Date()
    },
     {
      nombre: 'Permisos',
      icono: null,
      menu_padre_id: 100,
      uri: '/admin/permisos',
      posicion: 40,
      pantalla_id: 5,
      created_at: new Date(),
      updated_at: new Date()
    },
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('menus', null, {});
  }
};
