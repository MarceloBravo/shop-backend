import { UniqueConstraintError } from "sequelize";
import { UsuarioModel } from "../models/UsuarioModel.js";

class UsuarioRepository {
    getById = async (id, paranoid = true) => {
        const data = await UsuarioModel.findByPk(id, { paranoid });
        if(data){
            delete data.dataValues.password;
        }
        return data;
    }
    
    getBy = async (campo, valor, paranoid = true) => {
        const where = {[campo]: valor};
        const data = await UsuarioModel.findOne({where, paranoid});
        return data;
    }

    getAll = async (paranoid = true, orderBy = null) => {
        const { rows, count } = await UsuarioModel.findAndCountAll({
            order: orderBy,
            paranoid
        });
        return { data: rows, count };
    }

    getPage = async (desde = 1, regPorPag = 10, paranoid = true, orderBy = [['nombres', 'ASC']]) => {
        const { rows, count } = await UsuarioModel.findAndCountAll({
            offset: desde,
            limit: regPorPag,
            order: orderBy,
            paranoid
        });
        return { rows, count, totPag: Math.ceil(count / regPorPag) };
    }

    create = async (values, transaction = null) => {
        const data = await UsuarioModel.create(values, { transaction });
        delete data.dataValues.password;
        return data;
    }

    update = async (id, data, transaction = null) => {
        let [record, created] = await UsuarioModel.findOrCreate({
            where: { id },
            defaults: data,
            transaction,
            paranoid: false
        });

        if (created) return { data: record, created };

        if (record.deleted_at !== null) {
            await record.restore({ transaction });
            created = true;
        }

        // Si el registro ya existe, actualiza los valores
        record.rut = data.rut;
        record.nombres = data.nombres;
        record.apellido1 = data.apellido1;
        record.apellido2 = data.apellido2;
        record.avatar = data.avatar;
        record.direccion = data.direccion;
        record.fono = data.fono;
        record.email = data.email;
        record.user_name = data.user_name;
        if (data.password) record.password = data.password;
        if (data.refresh_token) record.refresh_token = data.refresh_token;
        record.rol_id = data.rol_id;

        await record.save({ transaction });

        return { data: record, created };
    }

    hardDelete = async (id, transaction = null) => {
        const result = await UsuarioModel.destroy({
            where: { id },
            force: true,
            paranoid: false,
            transaction
        });
        return { id, result };
    }

    softDelete = async (id, transaction = null) => {
        const result = await UsuarioModel.destroy({
            where: { id },
            transaction
        });
        return { id, result };
    }
}

export default UsuarioRepository;
