import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const TipoDimensionesModel = sequelize.define('tipo_dimensiones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {    //Kg, Litros, Metros, etc.
        type: DataTypes.DOUBLE(10,2),
        default: 0,
        nullable: false
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true,
    tableName: 'tipo_dimensiones',  // Asegura que el nombre de la tabla sea correcto
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