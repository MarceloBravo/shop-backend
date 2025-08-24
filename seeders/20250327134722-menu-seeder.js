'use strict';
import { MenuModel } from '../src/models/MenuModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    
    await MenuModel.bulkCreate(
      [
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
    
    ], {
      ignoreDuplicates: true
    });
  },

  async down () {
    await MenuModel.destroy({
      where: {
        nombre: ['Home', 'Configuración', 'Roles', 'Usuarios', 'Pantallas', 'Permisos']
      }
    });
  }
};
