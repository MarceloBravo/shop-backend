import { SubCategoriaModel } from "../../models/SubCategoriaModel.js";

export const getSubCategoria = async (id) => {
    const data = await SubCategoriaModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllSubCategoria = async (orderBy = [['nombre', 'ASC']]) => {
    const { rows, count } = await SubCategoriaModel.findAndCountAll({
        where: {deleted_at: null},
        order: orderBy
    });
    return {data: rows, count};
}


export const getPageSubCategoria = async (desde = 1, regPorPag = 10, orderBy = [['nombre', 'ASC']]) => {
    const { rows , count } = await SubCategoriaModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: orderBy
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createSubCategoria = async (valor) => {
    const data = await SubCategoriaModel.create(valor);
    return data;
}


export const updateSubCategoria = async (id, data) => {
    const [ subcategoria, created ] = await SubCategoriaModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: subcategoria, created};
    // Si el registro ya existe, actualiza los valores
    subcategoria.nombre = data.nombre;
    subcategoria.categoria_id = data.categoria_id;
    subcategoria.deleted_at = null;

    await subcategoria.save();

    return {data: subcategoria, created};
}


export const deleteSubCategoria = async (id) => {
    const result = await SubCategoriaModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteSubCategoria = async (id) => {
    const record = await SubCategoriaModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
