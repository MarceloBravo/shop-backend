import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const ProductoModel = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false        
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false        
    },
    sub_categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'subcategorias', // Nombre de la tabla
            key: 'id'               // Clave primaria
        }        
    },
    genero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'generos', // Nombre de la tabla
            key: 'id'               // Clave primaria
        }        
    },
    marca_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'marcas',
            key: 'id'
        }
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: true,
    tableName: 'productos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (producto, options) => {
            producto.created_at = new Date();
            producto.updated_at = new Date();
        },
        beforeUpdate: async (producto, options) => {
            producto.updated_at = new Date();
        },
        beforeDestroy: async (producto, options) => {
            producto.deleted_at = new Date();
        }
    }
});