import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const TallaLetraModel = sequelize.define('tallas_letras', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.STRING(5),
        allowNull: false        
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }

},{
    timestamps: true,
    tableName: 'tallas_letras',  // Asegura que el nombre de la tabla sea correcto
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