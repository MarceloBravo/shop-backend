import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const SubCategoriaModel = sequelize.define('subcategorias', {
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
    categoria_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',  // Nombre de la tabla
            key: 'id'        // Clave primaria
        }       
    }
},{
    timestamps: true,
    tableName: 'subcategorias',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,           // Usa snake_case en vez de camelCase
    paranoid: true,             // Habilita el soft delete
    deletedAt: 'deleted_at'     // Nombre de la columna para soft delete
});