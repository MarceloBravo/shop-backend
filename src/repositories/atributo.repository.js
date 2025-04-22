import { AtributosModel } from "../../models/AtributosModel.js";

export const getAtributo = async (id) => {
    const data = await AtributosModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllAtributo = async () => {
    const { rows, count } = await AtributosModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageAtributo = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await AtributosModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createAtributo = async (data) => {
    console.log("creando registro", data);
    const newRecord = await AtributosModel.create(data);
    return newRecord;
}


export const updateAtributo = async (id, data) => {
    const [ record, created ] = await AtributosModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: record, created};
    // Si el registro ya existe, actualiza los valores
    record.nombre = data.nombre;
    record.valor_string = data.valor_string;
    record.valor_numerico = data.valor_numerico;
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteAtributo = async (id) => {
    const result = await AtributosModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteAtributo = async (id) => {
    const record = await AtributosModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
