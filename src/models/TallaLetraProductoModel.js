import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const TallaLetraProductoModel = sequelize.define('talla_letra_producto', {
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
    talla_letra_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'tallas_letras',
            key: 'id'
        },
        unique: true
    }
},{
    paranoid: true,         //Habilita soft-delete
    timestamps: true,
    tableName: 'talla_letra_producto',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    deletedAt: 'deleted_at'
});