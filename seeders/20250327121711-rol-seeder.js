'use strict';

import { RolModel } from '../src/models/RolModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {
    
    await RolModel.bulkCreate(
      [
        {
          nombre: 'Admin',
          created_at: new Date(),
          updated_at: new Date()

        },
        {
          nombre: 'Cliente',
          created_at: new Date(),
          updated_at: new Date()
        }
      ], {
        ignoreDuplicates: true
      }
    )
  },

  async down () {
    await RolModel.destroy({
      where: {
        nombre: ['Admin', 'Cliente']
      }
    });
  }
};
