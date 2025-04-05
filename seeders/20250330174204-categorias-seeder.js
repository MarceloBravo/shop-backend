'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Vestuario',
        descripcion: 'Departamento de vestuario'
      },
      {
        nombre: 'Electronica',
        descripcion: 'Departamento de electrónica'
      },
      {
        nombre: 'Linea Blanca',
        descripcion: 'Departamento de línea blanca'
      },
      {
        nombre: 'Computación',
        descripcion: 'Departamento de computación'
      },
      {
        nombre: 'Deportes',
        descripcion: 'Departamento de deportes'
      },
      {
        nombre: 'Zapatería',
        descripcion: 'Departamento de vestuario'
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipo_producto', null, {});
  }
};
