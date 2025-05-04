import { ProductoModel } from "../../models/ProductoModel.js";

export const getProducto = async (id) => {
    const data = await ProductoModel.findByPk(id);
    return (data && data.deleted_at == null) ? data : null;
}


export const getAllProducto = async (orderBy = [['nombre', 'ASC']]) => {
    const { rows, count } = await ProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: orderBy
    });
    return {data: rows, count};
}


export const getPageProducto = async (desde = 1, regPorPag = 10, orderBy = [['nombre', 'ASC']]) => {
    const { rows , count } = await ProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: orderBy
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createProducto = async (data) => {
    console.log('createProducto',data)
    const result = await ProductoModel.create(data);
    return result;
}


export const updateProducto = async (id, data) => {
    const [ record, created ] = await ProductoModel.findOrCreate({where:{id}, defaults: data});
    if(created) return {data: producto, created};
    // Si el registro ya existe, actualiza los valores
    record.nombre        = data.nombre;
    record.descripcion   = data.descripcion;
    record.sub_categoria_id = data.sub_categoria_id;
    record.genero_id     = data.genero_id;
    record.producto_id   = data.producto_id;
    record.precio        = data.precio;
    record.deleted_at    = null;

    await record.save();

    return {data: record, created};
}


export const deleteProducto = async (id) => {
    const result = await ProductoModel.destroy({where: {id}});
    return {id, result};
}


export const softDeleteProducto = async (id) => {
    const record = await ProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
