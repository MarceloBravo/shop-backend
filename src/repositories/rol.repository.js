import { RolModel } from "../../models/RolModel.js";

export const getRol = async (id) => {
    const data = await RolModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllRol = async () => {
    const { rows, count } = await RolModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageRol = async (desde, regPorPag) => {
    const { rows , count } = await RolModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createRol = async (values) => {
    const data = await RolModel.create(values);
    return data;
}


export const updateRol = async (id, data) => {
    const [ Rol, created ] = await RolModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: Rol, created};
    // Si el registro ya existe, actualiza los valores
    Rol.nombre = data.nombre;
    Rol.deleted_at = null;

    await Rol.save();

    return {data: Rol, created};
}


export const deleteRol = async (id) => {
    const result = await RolModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteRol = async (id) => {
    const record = await RolModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    if(eliminado === null || eliminado === true)return null;
    record.deleted_at = new Date();
    await record.save();
    return record;
}
