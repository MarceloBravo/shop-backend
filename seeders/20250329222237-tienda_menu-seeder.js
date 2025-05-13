'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('menu_tienda', [
      {
        nombre: 'Home',
        icono: null,
        menu_padre_id: null,
        uri: 'home',
        posicion: 10,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Catálogo',
        icono: null,
        menu_padre_id: null,
        uri: 'catalogo',
        posicion: 20,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Autenticación cliente',
        icono: null,
        menu_padre_id: null,
        uri: 'login',
        posicion: 30,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Registro cliente',
        icono: null,
        menu_padre_id: null,
        uri: 'checkin',
        posicion: 40,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Checkout',
        icono: null,
        menu_padre_id: null,
        uri: 'checkout',
        posicion: 50,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Carrito',
        icono: null,
        menu_padre_id: null,
        uri: 'cart',
        posicion: 10,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Cerrar sessión',
        icono: null,
        menu_padre_id: null,
        uri: 'logout',
        posicion: 70,
        pantalla_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('menu_tienda', null, {});
  }
};
