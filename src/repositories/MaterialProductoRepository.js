import db from '../models/index.js';
const MaterialProductoModel = db.MaterialProductoModel;
const MaterialModel = db.MaterialModel;

class MaterialProductoRepository{

    getById = async (id, paranoid = true) => {
        const data = await MaterialProductoModel.findByPk(id, {
            include: [
                {
                    model: MaterialModel, // Modelo relacionado
                    as: 'material'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await MaterialProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            include: [
                {
                    model: MaterialModel, // Modelo relacionado
                    as: 'material'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await MaterialProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await MaterialProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
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


    hardDelete = async (id, transaction) => {
        const result = await MaterialProductoModel.destroy({where: {id},transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id) => {
        const result = await MaterialProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }
}
export default MaterialProductoRepository;