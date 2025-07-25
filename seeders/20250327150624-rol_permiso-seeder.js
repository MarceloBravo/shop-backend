'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('roles_permisos', [
      {
        rol_id: 1,
        acciones_pantalla_id: 1,
        crear: false,
        actualizar: false,
        eliminar: false,
        listar: false,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 2,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 2,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 3,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 4,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 5,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 1,
        acciones_pantalla_id: 6,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 1,
        crear: false,
        actualizar: false,
        eliminar: false,
        listar: false,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 2,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 2,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 3,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 4,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 5,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        rol_id: 2,
        acciones_pantalla_id: 6,
        crear: true,
        actualizar: true,
        eliminar: true,
        listar: true,
        ver: true,
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('roles_permisos', null, {});
  }
};
