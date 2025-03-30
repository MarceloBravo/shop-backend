import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

export const RolPermisosModel = sequelize.define('roles_permisos', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',  // Nombre de la tabla de roles
            key: 'id'        // Clave primaria de roles
        }
    },
    id_acciones_pantalla:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'acciones_pantallas',  // Nombre de la tabla de acciones_pantalla
            key: 'id'        // Clave primaria de acciones_pantalla
        }
    },
    crear:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    actualizar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    eliminar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    listar:{
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false
    },
    ver:{
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
    tableName: 'roles_permisos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    hooks: {
        beforeCreate: async (rolPermiso, options) => {
            rolPermiso.created_at = new Date();
            rolPermiso.updated_at = new Date();
        },
        beforeUpdate: async (rolPermiso, options) => {
            rolPermiso.updated_at = new Date();
        },
        beforeDestroy: async (rolPermiso, options) => {
            rolPermiso.deleted_at = new Date();
        }
    }
});

