'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('acciones_pantallas', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      pantalla_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pantallas',
          key: 'id'
        }
      },
      permite_crear: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      permite_actualizar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      permite_eliminar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      permite_listar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      acceso: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('acciones_pantallas');
  }
}; 