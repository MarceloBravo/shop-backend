import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const RolModel = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true,
    tableName: 'roles',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (rol, options) => {
            rol.created_at = new Date();
            rol.updated_at = new Date();
        },
        beforeUpdate: async (rol, options) => {
            rol.updated_at = new Date();
        },
        beforeDestroy: async (rol, options) => {
            rol.deleted_at = new Date();
        }
    }
});

