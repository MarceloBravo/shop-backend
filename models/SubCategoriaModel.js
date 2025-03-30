import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const SubCategoriaModel = sequelize.define('subcategorias', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',  // Nombre de la tabla
            key: 'id'        // Clave primaria
        }       
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    tymestamps: true,
    tableName: 'subcategorias',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (subcategoria, options) => {
            subcategoria.created_at = new Date();
            subcategoria.updated_at = new Date();
        },
        beforeUpdate: async (subcategoria, options) => {
            subcategoria.updated_at = new Date();
        },
        beforeDestroy: async (subcategoria, options) => {
            subcategoria.deleted_at = new Date();
        }
    }
});