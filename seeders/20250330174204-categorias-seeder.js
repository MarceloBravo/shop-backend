'use strict';
import { CategoriaModel } from '../src/models/CategoriaModel.js';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up () {

    await CategoriaModel.bulkCreate(
      [
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
    ], {
        ignoreDuplicates: true
      });
  },

  async down () {
    await CategoriaModel.destroy({
      where: {
        nombre: ['Vestuario', 'Electronica', 'Linea Blanca', 'Computación', 'Deportes', 'Zapatería']
      } 
    });
  }
};
