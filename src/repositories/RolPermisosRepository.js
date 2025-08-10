import { RolPermisosModel } from "../models/RolPermisosModel.js";

class RolPermisosRepository {
    getById = async (id, paranoid = true) => {
        const data = await RolPermisosModel.findByPk(id, { paranoid });
        return data;
    }



    getBy = async (where, paranoid = true) => {
        const data = await RolPermisosModel.findOne({where, paranoid });
        return data;
    }

    getAll = async (paranoid = true) => {
        const { rows, count } = await RolPermisosModel.findAndCountAll({
            order: [['rol_id', 'ASC']],
            paranoid
        });
        return { data: rows, count };
    }

    getPage = async (desde, regPorPag, paranoid = true) => {
        const { rows, count } = await RolPermisosModel.findAndCountAll({
            offset: desde,
            limit: regPorPag,
            order: [['rol_id', 'ASC']],
            paranoid
        });
        return { rows, count, totPag: Math.ceil(count / regPorPag) };
    }

    create = async (values, transaction = null) => {
        const data = await RolPermisosModel.create(values, { transaction });
        return data;
    }

    update = async (id, data, transaction = null) => {
        let [record, created] = await RolPermisosModel.findOrCreate({
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
        record.rol_id = data.rol_id;
        record.acciones_pantalla_id = data.acciones_pantalla_id;
        record.crear = data.crear;
        record.actualizar = data.actualizar;
        record.eliminar = data.eliminar;
        record.listar = data.listar;
        record.ver = data.ver;

        await record.save({ transaction });
        return { data: record, created };
    }

    hardDelete = async (id, transaction = null) => {
        const result = await RolPermisosModel.destroy({
            where: { id },
            force: true,
            paranoid: false,
            transaction
        });
        return { id, result };
    }

    softDelete = async (id, transaction = null) => {
        const result = await RolPermisosModel.destroy({
            where: { id },
            transaction
        });
        return { id, result };
    }
}

export default RolPermisosRepository;