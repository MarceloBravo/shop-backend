'use strict';
import { PantallaModel } from '../src/models/PantallaModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    
    await PantallaModel.bulkCreate(
      [
        {
          nombre: 'Home',
          uri: '/admin/home',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nombre: 'Roles',
          uri: '/admin/roles',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nombre: 'Usuarios',
          uri: '/admin/usuarios',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nombre: 'Pantallas',
          uri: '/admin/pantallas',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nombre: 'Menús',
          uri: '/admin/menus',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          nombre: 'Permisos',
          uri: '/admin/permisos',
          created_at: new Date(),
          updated_at: new Date()
        }
        ], {
        ignoreDuplicates: true
      });
    },

    async down () {
      await PantallaModel.destroy({
        where: {
          nombre: ['Home', 'Roles', 'Usuarios', 'Pantallas', 'Menús', 'Permisos']
        }
      });
    }
};
