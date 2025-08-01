import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const ProductoModel = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    sku:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
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
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    }
},{
    timestamps: true,
    tableName: 'productos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    paranoid: true,
    deletedAt: 'deleted_at'
});