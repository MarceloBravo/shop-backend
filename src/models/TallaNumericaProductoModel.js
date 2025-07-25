import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const TallaNumericaProductoModel = sequelize.define('talla_numerica_producto', {
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
        },
        unique: true
    },
    talla_numerica_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'tallas_numericas',
            key: 'id'
        }
    }
},{
    paranoid: true,         //Habilita soft-delete
    timestamps: true,
    tableName: 'talla_numerica_producto',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    deletedAt: 'deleted_at',
});