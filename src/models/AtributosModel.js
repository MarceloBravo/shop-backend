import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const AtributosModel = sequelize.define('atributos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false   
    },
    valor_string: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    valor_numerico: {
        type: DataTypes.DECIMAL(15,5),
        allowNull: true,
    }
},{
    paranoid: true,         // Habilita el soft delete
    timestamps: true,
    tableName: 'atributos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
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