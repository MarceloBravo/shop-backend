import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

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
    }
},{
    paranoid: true,       // Habilita el soft delete
    timestamps: true,
    tableName: 'roles',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

