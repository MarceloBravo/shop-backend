import { TallaNumericaModel } from "../../models/TallaNumericaModel.js";

export const getTallaNumero = async (id) => {
    const data = await TallaNumericaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllTallaNumero = async () => {
    const { rows, count } = await TallaNumericaModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['valor','ASC']]
    });
    return {data: rows, count};
}


export const getPageTallaNumero = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await TallaNumericaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['valor','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createTallaNumero = async (valor) => {
    const data = await TallaNumericaModel.create({valor});
    return data;
}


export const updateTallaNumero = async (id, data) => {
    const [ marca, created ] = await TallaNumericaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.valor = data.valor;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deleteTallaNumero = async (id) => {
    const result = await TallaNumericaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteTallaNumero = async (id) => {
    const record = await TallaNumericaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
