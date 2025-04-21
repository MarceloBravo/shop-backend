import { MarcaModel } from "../../models/MarcaModel.js";

export const getMarca = async (id) => {
    const data = await MarcaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMarca = async () => {
    const { rows, count } = await MarcaModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageMarca = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await MarcaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMarca = async (nombre, logo) => {
    const data = await MarcaModel.create({nombre, logo});
    return data;
}


export const updateMarca = async (id, data) => {
    const [ marca, created ] = await MarcaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.nombre = data.nombre;
    marca.logo = data.logo;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deleteMarca = async (id) => {
    const result = await MarcaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteMarca = async (id) => {
    const record = await MarcaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
