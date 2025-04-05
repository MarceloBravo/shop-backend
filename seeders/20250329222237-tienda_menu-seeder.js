'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('tienda_menus', [
      {
        nombre: 'Home',
        icono: null,
        menu_padre_id: null,
        uri: 'home',
        posicion: 10,
        pantalla_id: 1,
      },
      {
        nombre: 'Catálogo',
        icono: null,
        menu_padre_id: null,
        uri: 'catalogo',
        posicion: 20,
        pantalla_id: 1,
      },
      {
        nombre: 'Autenticación cliente',
        icono: null,
        menu_padre_id: null,
        uri: 'login',
        posicion: 30,
        pantalla_id: 1
      },
      {
        nombre: 'Registro cliente',
        icono: null,
        menu_padre_id: null,
        uri: 'checkin',
        posicion: 40,
        pantalla_id: 1
      },
      {
        nombre: 'Checkout',
        icono: null,
        menu_padre_id: null,
        uri: 'checkout',
        posicion: 50,
        pantalla_id: 1
      },
      {
        nombre: 'Carrito',
        icono: null,
        menu_padre_id: null,
        uri: 'cart',
        posicion: 10,
        pantalla_id: 1
      },
      {
        nombre: 'Cerrar sessión',
        icono: null,
        menu_padre_id: null,
        uri: 'logout',
        posicion: 70,
        pantalla_id: 1
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tienda_menus', null, {});
  }
};
