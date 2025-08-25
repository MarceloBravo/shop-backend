'use strict';
import { UsuarioModel } from '../src/models/UsuarioModel.js';
import { encriptarPassword } from '../src/shared/functions.js'

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    
    await UsuarioModel.bulkCreate(
      [
        {
          rut: '11.111.111-1',
          nombres: 'Marcelo',
          apellido1: 'Bravo',
          apellido2: 'Castillo',
          avatar: null,
          direccion: '12 Norte, Talca',
          fono: '+56 974331085',
          email: 'mabc@live.cl',
          user_name: 'mbravo',
          password: await encriptarPassword('123123'),
          rol_id: '1',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          rut: '22.222.222-2',
          nombres: 'Juan',
          apellido1: 'Pérez',
          apellido2: 'Pereira',
          avatar: null,
          direccion: '1 Sur 3 Oriente, #123',
          fono: '+56 987654321',
          email: 'juan@peres.cl',
          user_name: 'jperez',
          password: await encriptarPassword('123321'),
          rol_id: '2',
          created_at: new Date(),
          updated_at: new Date()
        },
      ], {
        ignoreDuplicates: true 
      })
  },

  async down () {
    await UsuarioModel.destroy({
      where: {
        rut: ['11.111.111-1', '22.222.222-2']
      }
    });
  }
};
