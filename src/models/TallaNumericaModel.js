import { DataTypes } from 'sequelize'
import { sequelize } from '../../config/database.js'

export const TallaNumericaModel = sequelize.define('TallaNumero', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    valor: {
        type: DataTypes.DECIMAL(4,1),
        allowNull: false,
        unique: true      
    }
}, {
    timestamps: true,
    tableName: 'tallas_numericas',
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
});