import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const MenuTiendaModel = sequelize.define('menu_tienda', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    icono: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    menu_padre_id: {
        type: DataTypes.INTEGER,
        allowNull: true        
    },
    uri: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    posicion: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    pantalla_id: {  // Clave foránea
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'pantallas',  // Nombre de la tabla de pantallas
            key: 'id'        // Clave primaria de pantallas
        }
    }
},{ 
    paranoid: true,             // Habilita el soft delete
    timestamps: true,
    tableName: 'menu_tienda',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (menu, options) => {
            menu.created_at = new Date();
            menu.updated_at = new Date();
        },
        beforeUpdate: async (menu, options) => {
            menu.updated_at = new Date();
        },
        beforeDestroy: async (menu, options) => {
            menu.deleted_at = new Date();
        }
    }
});
