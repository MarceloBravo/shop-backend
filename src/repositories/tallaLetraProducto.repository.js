import { TallaLetraProductoModel } from "../../models/TallaLetraProductoModel.js";

export const getTallaLetraProducto = async (id) => {
    const data = await TallaLetraProductoModel.findByPk(id, {
        include: [
            {
                model: TallaLetraModel, // Modelo relacionado
                as: 'talla_letra'
            }
        ]
    });

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllTallaLetraProducto = async () => {
    const { rows, count } = await TallaLetraProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']],
        include: [
            {
                model: TallaLetraModel, // Modelo relacionado
                as: 'talla_letra'
            }
        ]
    });
    return {data: rows, count};
}


export const getPageTallaLetraProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await TallaLetraProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createTallaLetraProducto = async (data, transaction) => {
    const newRecord = await TallaLetraProductoModel.create(data, {transaction});
    return newRecord;
}


export const updateTallaLetraProducto = async (id, data, transaction) => {
    const [record, created] = await TallaLetraProductoModel.findOrCreate({
        where: {id},
        defaults: data
    },
        {transaction}
    );
    record.producto_id = data.producto_id;
    record.talla_letra_id = data.talla_letra_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteTallaLetraProducto = async (id, transaction) => {
    const result = await TallaLetraProductoModel.destroy({where: {id},transaction});
    return {id, result};
}


export const softDeleteTallaLetraProducto = async (id) => {
    const record = await TallaLetraProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
