import { ColorModel } from "../../models/ColorModel.js";

export const getColor = async (id) => {
    const data = await ColorModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllColor = async () => {
    const { rows, count } = await ColorModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageColor = async (desde, regPorPag) => {
    const { rows , count } = await ColorModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });
    return {data: {rows, count, regPag: registrosPorPagina, pag}};
}


export const createColor = async (nombre, valor) => {
    const data = await ColorModel.create({nombre, valor});
    return data;
}


export const updateColor = async (id, data) => {
    const { nombre, valor } = data;
    const [ color, created ] = await ColorModel.findOrCreate({where:{id}, defaults: data});
    color.nombre = nombre;
    color.valor = valor;
    color.deleted_at = null;

    await color.save();

    return {data: color, created};
}


export const deleteColor = async (id) => {
    const result = await ColorModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteColor = async (id) => {
    const record = await ColorModel.findByPk(id);
    if(record && record.deleted_at == null){
        record.deleted_at = new Date();
        const result = await record.save();
        return {id, result};
    }else{
        return null;
    }
}
