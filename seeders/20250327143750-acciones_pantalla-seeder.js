'use strict';
import { AccionesPantallaModel } from '../src/models/AccionesPantallaModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    await AccionesPantallaModel.bulkCreate(
      [
        {
          pantalla_id: 1,
          permite_crear: false,
          permite_actualizar: false,
          permite_eliminar: false,
          permite_listar: false,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          pantalla_id: 2,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          pantalla_id: 3,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          pantalla_id: 4,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          pantalla_id: 5,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          pantalla_id: 6,
          permite_crear: true,
          permite_actualizar: true,
          permite_eliminar: true,
          permite_listar: true,
          permite_ver: true,
          created_at: new Date(),
          updated_at: new Date()
        }
    ], {
      ignoreDuplicates: true
    });
  },

  async down () {
    await AccionesPantallaModel.destroy({
      where: {
        pantalla_id: [1, 2, 3, 4, 5, 6]
      }
    });
  }
};
