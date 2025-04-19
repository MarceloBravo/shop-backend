import { CategoriaModel } from "../../models/CategoriaModel.js";

export const getCategoria = async (id) => {
    const data = await CategoriaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllCategoria = async () => {
    const { rows, count } = await CategoriaModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['nombre','ASC']]
    });
    return {data: rows, count};
}


export const getPageCategoria = async (desde, regPorPag) => {
    const { rows , count } = await CategoriaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['nombre','ASC']]
    });
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createCategoria = async (values) => {
    const data = await CategoriaModel.create(values);
    return data;
}


export const updateCategoria = async (id, data) => {
    const [ Categoria, created ] = await CategoriaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: Categoria, created};
    // Si el registro ya existe, actualiza los valores
    Categoria.nombre = data.nombre;
    Categoria.descripcion = data.descripcion;
    Categoria.deleted_at = null;

    await Categoria.save();

    return {data: Categoria, created};
}


export const deleteCategoria = async (id) => {
    const result = await CategoriaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteCategoria = async (id) => {
    const record = await CategoriaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    if(eliminado === null || eliminado === true)return null;
    record.deleted_at = new Date();
    await record.save();
    return record;
}
