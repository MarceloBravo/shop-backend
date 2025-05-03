import { GeneroModel } from "../../models/GeneroModel.js";

export const getGenero = async (id) => {
    const data = await GeneroModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllGenero = async () => {
    const { rows, count } = await GeneroModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['genero','ASC']]
    });
    return {data: rows, count};
}


export const getPageGenero = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await GeneroModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['genero','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createGenero = async (values) => {
    const data = await GeneroModel.create(values);
    return data;
}


export const updateGenero = async (id, data) => {
    const [ record, created ] = await GeneroModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: genero, created};
    // Si el registro ya existe, actualiza los valores
    record.genero = data.genero;
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteGenero = async (id) => {
    const result = await GeneroModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteGenero = async (id) => {
    const record = await GeneroModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
