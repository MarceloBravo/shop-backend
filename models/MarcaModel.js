import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const MarcaModel = sequelize.define('marcas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },
    logo: {
        type: DataTypes.STRING(500),
        allowNull: false        
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    tymestamps: true,
    tableName: 'marcas',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (marca, options) => {
            marca.created_at = new Date();
            marca.updated_at = new Date();
        },
        beforeUpdate: async (marca, options) => {
            marca.updated_at = new Date();
        },
        beforeDestroy: async (marca, options) => {
            marca.deleted_at = new Date();
        }
    }
});