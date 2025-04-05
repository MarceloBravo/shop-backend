import { DataTypes, DOUBLE } from 'sequelize'
import { sequelize } from '../config/database.js'

export const DimensionesModel = sequelize.define('dimensiones', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    alto: {
        type: DataTypes.DOUBLE(10,2),
        default: 0,
        nullable: false
    },
    ancho: {
        type: DataTypes.DOUBLE(10,2),
        default: 0,
        nullable: false
    },
    profundo: {
        type: DataTypes.DOUBLE(10,2),
        default: 0,
        nullable: true
    },
    peso: {
        type: DataTypes.DOUBLE(10,2),
        default: 0,
        nullable: true
    },
    tipo_dimension_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'tipo_dimensiones',
            key: 'id'
        }
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{
    timestamps: true,
    tableName: 'dimensiones',  // Asegura que el nombre de la tabla sea correcto
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