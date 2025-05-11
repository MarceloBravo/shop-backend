import { ValoracionProductoModel } from "../../models/ValoracionProductoModel.js";

export const getValoracionProducto = async (id) => {
    const data = await ValoracionProductoModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllValoracionProducto = async () => {
    const { rows, count } = await ValoracionProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['estrellas','ASC']]
    });
    return {data: rows, count};
}


export const getPageValoracionProducto = async (desde, regPorPag) => {
    const { rows , count } = await ValoracionProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['estrellas','ASC']]
    });
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createValoracionProducto = async (values) => {
    const data = await ValoracionProductoModel.create(values);
    return data;
}


export const updateValoracionProducto = async (id, data) => {
    const [ Valoracion, created ] = await ValoracionProductoModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: Valoracion, created};
    // Si el registro ya existe, actualiza los valores
    Valoracion.producto_id = data.producto_id;
    Valoracion.estrellas = data.estrellas;
    Valoracion.comentario = data.comentario;
    Valoracion.email = data.email;
    Valoracion.nombre = data.nombre;
    Valoracion.foto = data.foto;
    Valoracion.deleted_at = null;

    await Valoracion.save();

    return {data: Valoracion, created};
}


export const deleteValoracionProducto = async (id) => {
    const result = await ValoracionProductoModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteValoracionProducto = async (id) => {
    const record = await ValoracionProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    if(eliminado === null || eliminado === true)return null;
    record.deleted_at = new Date();
    await record.save();
    return record;
}
