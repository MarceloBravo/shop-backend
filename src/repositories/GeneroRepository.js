import db from '../models/index.js';

const  GeneroModel = db.GeneroModel;

class GeneroRepository{
    getById = async (id, paranoid = true) => {
        const data = await GeneroModel.findByPk(id, {paranoid});
        return data;
    }


    getBy = async (campo, valor, paranoid = true) => {
        const where = {};
        where[campo] = valor;
        const data = await GeneroModel.findOne({where, paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await GeneroModel.findAndCountAll({
            order: [['genero','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await GeneroModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['genero','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await GeneroModel.create(values, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        let [ record, created ] = await GeneroModel.findOrCreate({where:{id}, transaction, defaults: data, paranoid:false});
        if(created) return {data: record, created};
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        // Si el registro ya existe, actualiza los valores
        record.genero = data.genero;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await GeneroModel.destroy({where: {id}, transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await GeneroModel.destroy({where: {id},transaction});
        return {id, result};
    }
}

export default GeneroRepository;