import { ColorModel } from "../../models/ColorModel.js";

class ColorRepository{
    getById = async (id, paranoid = true) => {
        const data = await ColorModel.findByPk(id,{paranoid});
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
        const [ color, created ] = await ColorModel.findOrCreate({where:{id}, defaults: data, transaction});
        if(created) return {data: color, created};
        // Si el registro ya existe, actualiza los valores
        color.nombre = data.nombre;
        color.valor = data.valor;
        color.deleted_at = null;

        await color.save();

        return {data: color, created};
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