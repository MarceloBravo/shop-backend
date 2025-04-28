import { TallaLetraModel } from "../../models/TallaLetraModel.js";

export const getTallaLetra = async (id) => {
    const data = await TallaLetraModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllTallaLetra = async () => {
    const { rows, count } = await TallaLetraModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['valor','ASC']]
    });
    return {data: rows, count};
}


export const getPageTallaLetra = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await TallaLetraModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['valor','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createTallaLetra = async (valor) => {
    const data = await TallaLetraModel.create({valor});
    return data;
}


export const updateTallaLetra = async (id, data) => {
    const [ marca, created ] = await TallaLetraModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.valor = data.valor;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deleteTallaLetra = async (id) => {
    const result = await TallaLetraModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteTallaLetra = async (id) => {
    const record = await TallaLetraModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
