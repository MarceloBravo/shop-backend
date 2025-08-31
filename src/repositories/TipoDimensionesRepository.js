import db from '../models/index.js';
const TipoDimensionesModel = db.TipoDimensionesModel;

class TipoDimensionesRepository {
    getById = async (id, paranoid = true) => {
        const data = await TipoDimensionesModel.findByPk(id, { paranoid });
        return data;
    }

    getBy = async (campo, valor, paranoid = true) => {
        const where = { [campo]: valor };
        const data = await TipoDimensionesModel.findOne({where, paranoid });
        return data;
    }

    getAll = async (orderBy = [['nombre', 'ASC']], paranoid = true) => {
        const { rows, count } = await TipoDimensionesModel.findAndCountAll({
            order: orderBy,
            paranoid
        });
        return {data: rows, count};
    }

    getPage = async (desde = 1, regPorPag = 10, orderBy = [['nombre', 'ASC']], paranoid = true) => {
        const { rows, count } = await TipoDimensionesModel.findAndCountAll({
            offset: desde,
            limit: regPorPag,
            order: orderBy,
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }

    create = async (valor, transaction = null) => {
        const data = await TipoDimensionesModel.create(valor, { transaction });
        return data;
    }

    update = async (id, data, transaction = null) => {
        let [ record, created ] = await TipoDimensionesModel.findOrCreate({
            where: {id}, 
            defaults: data,
            paranoid: false,
            transaction
        });
        if(created) return {data: record, created};
        if(record.deleted_at !== null) {
            await record.restore({transaction});
            created = true;
        }
        
        record.nombre = data.nombre;
        record.nombre_corto = data.nombre_corto;

        await record.save({ transaction });
        return {data: record, created};
    }

    hardDelete = async (id, transaction = null) => {
        const result = await TipoDimensionesModel.destroy({
            where: {id},
            force: true,
            paranoid: false,
            transaction
        });
        return {id, result};
    }

    softDelete = async (id, transaction = null) => {
        const result = await TipoDimensionesModel.destroy({
            where: {id},
            transaction
        });
        return {id, result};
    }
}

export default TipoDimensionesRepository;
