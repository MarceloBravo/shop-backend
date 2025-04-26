import { MaterialModel } from "../../models/MaterialModel.js";

export const getMaterial = async (id) => {
    const data = await MaterialModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMaterial = async () => {
    const { rows, count } = await MaterialModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['valor','ASC']]
    });
    return {data: rows, count};
}


export const getPageMaterial = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await MaterialModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['valor','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMaterial = async (valor) => {
    const data = await MaterialModel.create({valor});
    return data;
}


export const updateMaterial = async (id, data) => {
    const [ marca, created ] = await MaterialModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.valor = data.valor;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deleteMaterial = async (id) => {
    const result = await MaterialModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteMaterial = async (id) => {
    const record = await MaterialModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
