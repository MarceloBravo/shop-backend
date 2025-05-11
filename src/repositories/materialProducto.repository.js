import { MaterialProductoModel } from "../../models/MaterialProductoModel.js";

export const getMaterialProducto = async (id) => {
    const data = await MaterialProductoModel.findByPk(id, {
        include: [
            {
                model: MaterialModel, // Modelo relacionado
                as: 'material'
            }
        ]
    });

    return (data && data.deleted_at == null) ? data : null;
}


export const getAllMaterialProducto = async () => {
    const { rows, count } = await MaterialProductoModel.findAndCountAll({
        where: {deleted_at: null},
        order: [['producto_id','ASC']],
        include: [
            {
                model: MaterialModel, // Modelo relacionado
                as: 'material'
            }
        ]
    });
    return {data: rows, count};
}


export const getPageMaterialProducto = async (desde = 1, regPorPag = 10) => {
    const { rows , count } = await MaterialProductoModel.findAndCountAll({
        where: {deleted_at: null},
        offset:desde,
        limit: regPorPag,
        order: [['producto_id','ASC']]
    });    
    return {rows, count, totPag: Math.ceil(count / regPorPag)};
}


export const createMaterialProducto = async (data, transaction) => {
    const newRecord = await MaterialProductoModel.create(data, {transaction});
    return newRecord;
}


export const updateMaterialProducto = async (id, data, transaction) => {
    const [record, created] = await MaterialProductoModel.findOrCreate({
        where: {id},
        defaults: data
    },
        {transaction}
    );
    record.producto_id = data.producto_id;
    record.material_id = data.material_id;
    if (created) return { data: record, created };

    // Si el registro ya existe, actualiza los valores
    record.deleted_at = null;

    await record.save();

    return {data: record, created};
}


export const deleteMaterialProducto = async (id, transaction) => {
    const result = await MaterialProductoModel.destroy({where: {id}},{transaction});
    return {id, result};
}


export const softDeleteMaterialProducto = async (id) => {
    const record = await MaterialProductoModel.findByPk(id);
    const eliminado = (record && record.deleted_at !== null);
    
    if(eliminado === null || eliminado === true)return null;

    record.deleted_at = new Date();
    await record.save();
    return record;
}
