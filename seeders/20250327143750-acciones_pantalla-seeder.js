'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('acciones_pantallas', [
        {
          pantalla_id: 1,
          permite_crear: false,
          permite_actualizar: false,
          permite_eliminar: false,
          permite_listar: false,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pantalla_id: 2,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pantalla_id: 3,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pantalla_id: 4,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pantalla_id: 5,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          pantalla_id: 6,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date(),
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('acciones_pantallas', null, {});
  }
};
