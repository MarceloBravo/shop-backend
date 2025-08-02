import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const GeneroModel = sequelize.define('generos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    genero: {
        type: DataTypes.ENUM('Masculino','Femenino','Unisex','No aplica'),
        allowNull: false,
        default: 'No aplica'
    }
},{
    paranoid: true,             // Habilita el soft delete
    timestamps: true,
    tableName: 'generos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,            // Usa snake_case en vez de camelCase
});


export async function up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('generos', {
      fields: ['genero'],
      type: 'unique',
      name: 'genero_unique_constraint'
    });
  }


  export async function down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('generos', 'genero_unique_constraint');
  }