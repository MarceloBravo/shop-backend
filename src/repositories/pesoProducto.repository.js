import { PesoProductoModel } from "../../models/PesoProductoModel.js";

export const getPesoProducto = async (id) => {
    const data = await PesoProductoModel.findByPk(id, {
        include: [
            {
                model: PesoModel, // Modelo relacionado
                as: 'peso'
            }
        ]
    });

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllPesoProducto = async () => {
    const { rows, count } = await PesoProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']],
        include: [
            {
                model: PesoModel, // Modelo relacionado
                as: 'peso'
            }
        ]
    });
    return {data: rows, count};
}


export const getPagePesoProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await PesoProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createPesoProducto = async (data, transaction) => {
    const newRecord = await PesoProductoModel.create(data, {transaction});
    return newRecord;
}


export const updatePesoProducto = async (id, data, transaction ) => {
    const [record, created] = await PesoProductoModel.findOrCreate({
        where: {id},
        defaults: data,
        transaction
    });

    record.producto_id = data.producto_id;
    record.peso = data.peso;
    record.tipo_dimension_id = data.tipo_dimension_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deletePesoProducto = async (id, transaction) => {
    const result = await PesoProductoModel.destroy({where: {id}}, {transaction});
    return {id, result};
}


export const softDeletePesoProducto = async (id) => {
    const record = await PesoProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
