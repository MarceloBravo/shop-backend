'use strict';
import { RolPermisosModel } from '../src/models/RolPermisosModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {

    await RolPermisosModel.bulkCreate(
      [
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
      ], {
        ignoreDuplicates: true
      });
  },

  async down () {
    await RolPermisosModel.destroy({
      where: {
        rol_id: [1, 2],
        acciones_pantalla_id: [1, 2, 3, 4, 5, 6]
      } 
    });
  }
};
