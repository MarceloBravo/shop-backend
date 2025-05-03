import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const TallaNumericaModel = sequelize.define('tallas_numericas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.DECIMAL(3,1),
        allowNull: false,
        unique: true        
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: true,
    tableName: 'tallas_numericas',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (talla, options) => {
            talla.created_at = new Date();
            talla.updated_at = new Date();
        },
        beforeUpdate: async (talla, options) => {
            talla.updated_at = new Date();
        },
        beforeDestroy: async (talla, options) => {
            talla.deleted_at = new Date();
        }
    }
});