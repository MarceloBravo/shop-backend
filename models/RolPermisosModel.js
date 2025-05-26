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
    acciones_pantalla_id:{
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
    }
},{
    timestamps: true,
    tableName: 'roles_permisos',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    paranoid: true,     //Habilita paranoid,
    deletedAt: 'deleted_at'
});

