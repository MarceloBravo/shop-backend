import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const ColorProductoModel = sequelize.define('color_producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'productos',
            key: 'id'
        }
    },
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'colores',
            key: 'id'
        }
    }

},{
    paranoid: true,            // Habilita el soft delete
    timestamps: true,
    tableName: 'color_producto',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,            // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (color, options) => {
            color.created_at = new Date();
            color.updated_at = new Date();
        },
        beforeUpdate: async (color, options) => {
            color.updated_at = new Date();
        },
        beforeDestroy: async (color, options) => {
            color.deleted_at = new Date();
        }
    }
});