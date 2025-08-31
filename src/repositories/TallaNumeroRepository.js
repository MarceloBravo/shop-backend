import db from '../models/index.js';
const TallaNumericaModel = db.TallaNumericaModel;

class TallaNumeroRepository {
    getById = async (id, paranoid = true) => {
        const data = await TallaNumericaModel.findByPk(id, { paranoid });
        return data;
    }
    
    getBy = async (campo, valor, paranoid = true) => {
        const where = {[campo]: valor};
        const data = await TallaNumericaModel.findOne({where, paranoid });
        return data;
    }

    getAll = async (orderBy = [['valor', 'ASC']], paranoid = true) => {
        const { rows, count } = await TallaNumericaModel.findAndCountAll({
            order: orderBy,
            paranoid
        });
        return { data: rows, count };
    }

    getPage = async (desde = 1, regPorPag = 10, orderBy = [['valor', 'ASC']], paranoid = true) => {
        const { rows, count } = await TallaNumericaModel.findAndCountAll({
            offset: desde,
            limit: regPorPag,
            order: orderBy,
            paranoid
        });
        return { rows, count, totPag: Math.ceil(count / regPorPag) };
    }

    create = async (valor, transaction = null) => {
        const data = await TallaNumericaModel.create(valor, { transaction });
        return data;
    }

    update = async (id, data, transaction = null) => {
        let [record, created] = await TallaNumericaModel.findOrCreate({
            where: { id },
            defaults: data,
            paranoid: false,
            transaction
        });
        if (created) return { data: record, created };
        if (record.deletedAt !== null) {
            await record.restore({ transaction });
            created = true;
        }

        record.valor = data.valor;
        await record.save({ transaction });
        return { data: record, created };
    }

    hardDelete = async (id, transaction = null) => {
        const result = await TallaNumericaModel.destroy({
            where: { id },
            force: true,
            transaction
        });
        return { id, result };
    }

    softDelete = async (id, transaction = null) => {
        const result = await TallaNumericaModel.destroy({
            where: { id },
            transaction
        });
        return { id, result };
    }
}

export default TallaNumeroRepository;
