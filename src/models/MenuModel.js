import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const MenuModel = sequelize.define('menus', {
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
        allowNull: true,
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
    paranoid: true,         // Habilita el soft delete
    timestamps: true,
    tableName: 'menus',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    createdAt: 'created_at',
});
