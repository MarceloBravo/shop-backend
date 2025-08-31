import db from '../models/index.js';
const PesoProductoModel = db.PesoProductoModel;

class PesoProductoRepository{
    getById = async (id, paranoid = true) => {
        const data = await PesoProductoModel.findByPk(id, {
            include: [
                {
                    model: PesoModel, // Modelo relacionado
                    as: 'peso'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await PesoProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            include: [
                {
                    model: PesoModel, // Modelo relacionado
                    as: 'peso'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await PesoProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await PesoProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction = null ) => {
        let [record, created] = await PesoProductoModel.findOrCreate({
            where: {id},
            defaults: data,
            transaction,
            paranoid: false
        });
        if (created) return { data: record, created };
        if(record.deleted_at !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.producto_id = data.producto_id;
        record.peso = data.peso;
        record.tipo_dimension_id = data.tipo_dimension_id;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await PesoProductoModel.destroy({where: {id}}, {transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await PesoProductoModel.destroy({where: {id}}, {transaction});
        return {id, result};
    }
}

export default PesoProductoRepository;