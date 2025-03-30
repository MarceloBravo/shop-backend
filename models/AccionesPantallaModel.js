import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const AccionesPantallaModel = sequelize.define('acciones_pantallas', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    pantalla_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'pantallas', // Nombre de la tabla de pantallas
            key: 'id'           // Clave primaria de pantallas
        }
    },
    permite_crear:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    permite_actualizar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    permite_eliminar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    permite_listar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    permite_ver:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    deleted_at: {
        type:DataTypes.DATE,
        allowNull: true
    }
},{ 
    tymestamps: true,
    tableName: 'acciones_pantallas',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (grupoUsuario, options) => {
            grupoUsuario.created_at = new Date();
            grupoUsuario.updated_at = new Date();
        },
        beforeUpdate: async (grupoUsuario, options) => {
            grupoUsuario.updated_at = new Date();
        },
        beforeDestroy: async (grupoUsuario, options) => {
            grupoUsuario.deleted_at = new Date();
        }
    }
});

