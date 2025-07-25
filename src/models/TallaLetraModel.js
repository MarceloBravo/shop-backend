import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const TallaLetraModel = sequelize.define('tallas_letras', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true        
    }
}, {
    timestamps: true,
    tableName: 'tallas_letras',
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
});