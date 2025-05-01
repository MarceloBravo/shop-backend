import { PantallaModel } from "../../models/PantallaModel.js";

export const getPantalla = async (id) => {
    const data = await PantallaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllPantalla = async () => {
    const { rows, count } = await PantallaModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPagePantalla = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await PantallaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createPantalla = async (nombre, uri) => {
    const data = await PantallaModel.create({nombre, uri});
    return data;
}


export const updatePantalla = async (id, data) => {
    const [ marca, created ] = await PantallaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: marca, created};
    // Si el registro ya existe, actualiza los valores
    marca.nombre = data.nombre;
    marca.uri = data.uri;
    marca.deleted_at = null;

    await marca.save();

    return {data: marca, created};
}


export const deletePantalla = async (id) => {
    const result = await PantallaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeletePantalla = async (id) => {
    const record = await PantallaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
