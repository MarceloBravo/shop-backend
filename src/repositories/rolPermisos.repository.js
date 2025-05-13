import { RolPermisosModel } from "../../models/RolPermisosModel.js";

export const getRolPermisos = async (id) => {
    const data = await RolPermisosModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllRolPermisos = async () => {
    const { rows, count } = await RolPermisosModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['rol_id','ASC']]
    });
    return {data: rows, count};
}


export const getPageRolPermisos = async (desde, regPorPag) => {
    const { rows , count } = await RolPermisosModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['rol_id','ASC']]
    });
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createRolPermisos = async (values) => {
    const data = await RolPermisosModel.create(values);
    return data;
}


export const updateRolPermisos = async (id, data) => {
    const [ Rol, created ] = await RolPermisosModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: Rol, created};
    // Si el registro ya existe, actualiza los valores
    Rol.rol_id = data.rol_id;
    Rol.acciones_pantalla_id = data.acciones_pantalla_id;
    Rol.crear = data.crear;
    Rol.actualizar = data.actualizar;
    Rol.eliminar = data.eliminar;
    Rol.listar = data.listar;
    Rol.ver = data.ver;
    Rol.deleted_at = null;

    await Rol.save();

    return {data: Rol, created};
}


export const deleteRolPermisos = async (id) => {
    const result = await RolPermisosModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteRolPermisos = async (id) => {
    const record = await RolPermisosModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    if(eliminado === null || eliminado === true)return null;
    record.deleted_at = new Date();
    await record.save();
    return record;
}
