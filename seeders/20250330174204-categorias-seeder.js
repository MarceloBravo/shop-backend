'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias', [
      {
        nombre: 'Vestuario',
        descripcion: 'Departamento de vestuario',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Electronica',
        descripcion: 'Departamento de electrónica',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Linea Blanca',
        descripcion: 'Departamento de línea blanca',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Computación',
        descripcion: 'Departamento de computación',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Deportes',
        descripcion: 'Departamento de deportes',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        nombre: 'Zapatería',
        descripcion: 'Departamento de vestuario',
        created_at: new Date(),
        updated_at: new Date()
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tipo_producto', null, {});
  }
};
