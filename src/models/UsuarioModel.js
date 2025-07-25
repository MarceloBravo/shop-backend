import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const UsuarioModel = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true        
    },
    rut: {
        type: DataTypes.STRING(13),
        allowNull: false,
        unique: true
    },
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido1: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellido2: {
        type: DataTypes.STRING(50),
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fono: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    user_name:{
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    refresh_token:{
        type: DataTypes.TEXT,
        allowNull: true
    },
    rol_id: {  // Clave foránea
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',  // Nombre de la tabla de roles
            key: 'id'        // Clave primaria de roles
        }
    }
},{
    timestamps: true,
    tableName: 'usuarios',  // Asegura que el nombre de la tabla sea correcto
    underscored: true,       // Usa snake_case en vez de camelCase
    paranoid: true,         //Habilita soft-delete
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

