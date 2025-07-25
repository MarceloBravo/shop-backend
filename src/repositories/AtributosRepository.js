import { AtributosModel } from "../models/AtributosModel.js";

class AtributosRepository{

    getById = async (id, paranoid = true) => {
        const data = await AtributosModel.findByPk(id, {paranoid});
        return data;
    }

    
    getAll = async (paranoid= true) => {
        const { rows, count } = await AtributosModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await AtributosModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await AtributosModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
        let [ record, created ] = await AtributosModel.findOrCreate({where:{id}, defaults: data, transaction, paranoid:false});
        if(created) return {data: record, created};
        // Si el registro ya existe, actualiza los valores
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.nombre = data.nombre;
        record.valor_string = data.valor_string;
        record.valor_numerico = data.valor_numerico;
        
        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await AtributosModel.destroy({where: {id}, transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await AtributosModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default AtributosRepository;