import { MaterialModel } from "../models/MaterialModel.js";


class MaterialRepository{
    getById = async (id, paranoid = true) => {
        const data = await MaterialModel.findByPk(id, {paranoid});
        return data;
    }


    getBy = async (campo, valor, paranoid = true) => {
        const where = {};
        where[campo] = valor;
        const data = await MaterialModel.findOne({where, paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await MaterialModel.findAndCountAll({
            order: [['valor','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await MaterialModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['valor','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await MaterialModel.create(values,{transaction});
        return data;
    }


    update = async (id, values, transaction = null) => {
        let [ record, created ] = await MaterialModel.findOrCreate({where:{id}, transaction, defaults: values, paranoid:false });
        if(created) return {data: record, created};
        // Si el registro ya existe, actualiza los valores
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.valor = values.valor;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await MaterialModel.destroy({where: {id}, transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await MaterialModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default MaterialRepository;