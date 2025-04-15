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
    return {data: {rows, count, regPag: registrosPorPagina, pag}};
}


export const createCategoria = async (nombre, valor) => {
    const data = await CategoriaModel.create({nombre, valor});
    return data;
}


export const updateCategoria = async (id, data) => {
    const { nombre, valor } = data;
    const [ Categoria, created ] = await CategoriaModel.findOrCreate({where:{id}, defaults: data});
    Categoria.nombre = nombre;
    Categoria.valor = valor;
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
    if(record && record.deleted_at == null){
        record.deleted_at = new Date();
        const result = await record.save();
        return {id, result};
    }else{
        return null;
    }
}
