import { TallaNumericaProductoModel } from "../../models/TallaNumericaProductoModel.js";

export const getTallaNumeroProducto = async (id) => {
    const data = await TallaNumericaProductoModel.findByPk(id, {
        include: [
            {
                model: TallaNumericaModel, // Modelo relacionado
                as: 'tallas_numericas'
            }
        ]
    });

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllTallaNumeroProducto = async () => {
    const { rows, count } = await TallaNumericaProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']],
        include: [
            {
                model: TallaNumericaModel, // Modelo relacionado
                as: 'tallas_numericas'
            }
        ]
    });
    return {data: rows, count};
}


export const getPageTallaNumeroProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await TallaNumericaProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createTallaNumeroProducto = async (data, transaction) => {
    const newRecord = await TallaNumericaProductoModel.create(data, {transaction});
    return newRecord;
}


export const updateTallaNumeroProducto = async (id, data, transaction) => {
    const [record, created] = await TallaNumericaProductoModel.findOrCreate({
        where: {id},
        defaults: data
    },
        {transaction}
    );
    record.producto_id = data.producto_id;
    record.talla_numerica_id = data.talla_numerica_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteTallaNumeroProducto = async (id, transaction) => {
    const result = await TallaNumericaProductoModel.destroy({where: {id}},{transaction});
    return {id, result};
}


export const softDeleteTallaNumeroProducto = async (id) => {
    const record = await TallaNumericaProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
