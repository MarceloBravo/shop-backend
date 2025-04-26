import { GeneroModel } from "../../models/GeneroModel.js";

export const getMarca = async (id) => {
    const data = await GeneroModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMarca = async () => {
    const { rows, count } = await GeneroModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['valor','ASC']]
    });
    return {data: rows, count};
}


export const getPageMarca = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await GeneroModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['valor','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMarca = async (valor, logo) => {
    const data = await GeneroModel.create({valor, logo});
    return data;
}


export const updateMarca = async (id, data) => {
    const [ record, created ] = await GeneroModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    record.genero = data.genero;
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteMarca = async (id) => {
    const result = await GeneroModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteMarca = async (id) => {
    const record = await GeneroModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
