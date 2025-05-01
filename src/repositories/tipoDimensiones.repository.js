import { TipoDimensionesModel } from "../../models/TipoDimensionesModel.js";

export const getTipoDimensiones = async (id) => {
    const data = await TipoDimensionesModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllTipoDimensiones = async () => {
    const { rows, count } = await TipoDimensionesModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageTipoDimensiones = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await TipoDimensionesModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createTipoDimensiones = async (data) => {
    const result = await TipoDimensionesModel.create(data);
    return result;
}


export const updateTipoDimensiones = async (id, data) => {
    const [ marca, created ] = await TipoDimensionesModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.nombre = data.nombre;
    marca.nombre_corto = data.nombre_corto;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deleteTipoDimensiones = async (id) => {
    const result = await TipoDimensionesModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteTipoDimensiones = async (id) => {
    const record = await TipoDimensionesModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
