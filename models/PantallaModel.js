import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const PantallaModel = sequelize.define('pantallas', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    uri: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
    
},{
    timestamps: true,
    tableName: 'pantallas',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (pantalla, options) => {
            pantalla.created_at = new Date();
            pantalla.updated_at = new Date();
        },
        beforeUpdate: async (pantalla, options) => {
            pantalla.updated_at = new Date();
        },
        beforeDestroy: async (pantalla, options) => {
            pantalla.deleted_at = new Date();
        }
    }
});

