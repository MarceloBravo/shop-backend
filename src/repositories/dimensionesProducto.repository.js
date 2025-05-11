import { DimensionesProductoModel } from "../../models/DimensionesProductoModel.js";

export const getDimensionesProducto = async (id) => {
    const data = await DimensionesProductoModel.findByPk(id);

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllDimensionesProducto = async () => {
    const { rows, count } = await DimensionesProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']]
    });
    return {data: rows, count};
}


export const getPageDimensionesProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await DimensionesProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createDimensionesProducto = async (data, transaction) => {
    const newRecord = await DimensionesProductoModel.create(data, {transaction});
    return newRecord;
}


export const updateDimensionesProducto = async (id, data, transaction ) => {
    const [record, created] = await DimensionesProductoModel.findOrCreate({
        where: {id},
        defaults: data,
        transaction
    });
    record.producto_id = data.producto_id;
    record.dimensiones_id = data.dimensiones_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteDimensionesProducto = async (id, transaction) => {
    const result = await DimensionesProductoModel.destroy({where: {id}},{transaction});
    return {id, result};
}


export const softDeleteDimensionesProducto = async (id) => {
    const record = await DimensionesProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
