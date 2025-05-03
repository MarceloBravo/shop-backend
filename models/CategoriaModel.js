import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const CategoriaModel = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true        
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false        
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: true,
    tableName: 'categorias',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (categoria, options) => {
            categoria.created_at = new Date();
            categoria.updated_at = new Date();
        },
        beforeUpdate: async (categoria, options) => {
            categoria.updated_at = new Date();
        },
        beforeDestroy: async (categoria, options) => {
            categoria.deleted_at = new Date();
        }
    }
});