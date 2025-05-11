import { ColorProductoModel } from "../../models/ColorProductoModel.js";

export const getColorProducto = async (id) => {
    const data = await ColorProductoModel.findByPk(id, {
        include: [
            {
                model: ColorModel, // Modelo relacionado
                as: 'color'
            }
        ]
    });

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllColorProducto = async () => {
    const { rows, count } = await ColorProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']],
        include: [
            {
                model: ColorModel, // Modelo relacionado
                as: 'color'
            }
        ]
    });
    return {data: rows, count};
}


export const getPageColorProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await ColorProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createColorProducto = async (data, transaction) => {
    const newRecord = await ColorProductoModel.create(data, {transaction});
    return newRecord;
}


export const updateColorProducto = async (id, data, transaction) => {
    const [record, created] = await ColorProductoModel.findOrCreate({
        where: {id},
        defaults: data,
        transaction
    });
    record.producto_id = data.producto_id;
    record.color_id = data.color_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteColorProducto = async (id, transaction) => {
    const result = await ColorProductoModel.destroy({where: {id}},{transaction});
    return {id, result};
}


export const softDeleteColorProducto = async (id) => {
    const record = await ColorProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
