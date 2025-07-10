import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const ValoracionProductoModel = sequelize.define('valoraciones_producto', {
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
            key: 'id',
            unique: true
        }
    },
    estrellas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: true        
    },
    email: {
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: false,
        validate: {
            isEmail: true
        }
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    foto: {
        type: DataTypes.STRING(500),
        allowNull: true
    },    
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
    }
}, {
    paranoid: true,         // Habilita soft-delete
    timestamps: true,
    tableName: 'valoraciones_producto',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,      // Usa snake_case en vez de camelCase
    deletedAt: 'deleted_at'
});