import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const DimensionesProductoModel = sequelize.define('dimensiones_producto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'productos',
            key: 'id'
        }
    },
    alto: {
        type: DataTypes.DECIMAL(10,2),
        default: 0.0,
        nullable: false
    },
    ancho: {
        type: DataTypes.DECIMAL(10,2),
        default: 0.0,
        nullable: false
    },
    profundo: {
        type: DataTypes.DECIMAL(10,2),
        default: 0.0,
        nullable: true
    },
    tipo_dimension_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'tipo_dimensiones',
            key: 'id'
        }
    }
},{
    timestamps: true,
    tableName: 'dimensiones_producto',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,            // Usa snake_case en vez de camelCase
    paranoid: true,
    deletedAt: 'deleted_at',
});