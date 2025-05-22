import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const TipoDimensionesModel = sequelize.define('tipo_dimensiones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre:{
        type: DataTypes.STRING(30),
        default: 0,
        nullable: false,
        unique: true
    },
    nombre_corto: {    //Kg, Litros, Metros, etc.
        type: DataTypes.STRING(10),
        default: 0,
        nullable: false,
        unique: true
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{
    paranoid: true,             // Habilita el soft delete
    timestamps: true,
    tableName: 'tipo_dimensiones',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,           // Usa snake_case en vez de camelCase
    deletedAt: 'deleted_at'     // Nombre de la columna para soft delete
});