import { UsuarioModel } from "../../models/UsuarioModel.js";

export const getUsuario = async (id) => {
    const data = await UsuarioModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllUsuario = async (orderBy = [['nombres', 'ASC']]) => {
    const { rows, count } = await UsuarioModel.findAndCountAll({
        where: {deleted_at: null},
        order: orderBy
    });
    return {data: rows, count};
}


export const getPageUsuario = async (desde, regPorPag, orderBy = [['nombres', 'ASC']]) => {
    const { rows , count } = await UsuarioModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: orderBy
    });
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createUsuario = async (values) => {
    const data = await UsuarioModel.create(values);
    return data;
}


export const updateUsuario = async (id, values) => {
    const [ Usuario, created ] = await UsuarioModel.findOrCreate({where:{id}, defaults: values});
    if(created) return {data: Usuario, created};
    // Si el registro ya existe, actualiza los valores
    Usuario.rut = values.rut;
    Usuario.nombres = values.nombres;
    Usuario.apellido1 = values.apellido1;
    Usuario.apellido2 = values.apellido2;
    Usuario.avatar = values.avatar;
    Usuario.direccion = values.direccion;
    Usuario.fono = values.fono;
    Usuario.email = values.email;
    Usuario.user_name = values.user_name;
    if(values.pasdsword)Usuario.password = values.password;
    if(values.pasdsword)Usuario.refresh_token = values.refresh_token;
    Usuario.rol_id = values.rol_id;
    Usuario.deleted_at = null;

    await Usuario.save();

    return {data: Usuario, created};
}


export const deleteUsuario = async (id) => {
    const result = await UsuarioModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteUsuario = async (id) => {
    const record = await UsuarioModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    if(eliminado === null || eliminado === true)return null;
    record.deleted_at = new Date();
    await record.save();
    return record;
}
