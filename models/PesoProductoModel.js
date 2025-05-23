import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const PesoProductoModel = sequelize.define('peso', {
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
    peso: {
        type: DataTypes.DOUBLE(10,2),
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
    paranoid: true,     //Habilita soft-delete
    timestamps: true,
    tableName: 'peso',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    createdAt: 'created_at',
});