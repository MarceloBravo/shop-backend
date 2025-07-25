import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const MaterialProductoModel = sequelize.define('material_producto', {
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
    material_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'materiales',
            key: 'id'
        }
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: true,
    tableName: 'material_producto',  // Asegura que el nombre de la tabla sea correcto
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