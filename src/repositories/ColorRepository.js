import { ColorModel } from "../../models/ColorModel.js";

class ColorRepository{
    getById = async (id, paranoid = true, transaction = null) => {
        const data = await ColorModel.findByPk(id,{paranoid, transaction});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await ColorModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid

        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await ColorModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await ColorModel.create(values, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        let [ record, created ] = await ColorModel.findOrCreate({where:{id}, defaults: data, transaction, paranoid:false});
        if(created) return {data: record, created};
        
        // Si el registro ya existe, actualiza los valores
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.nombre = data.nombre;
        record.valor = data.valor;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await ColorModel.destroy({where: {id}, transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await ColorModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default ColorRepository;