import db from '../models/index.js';

const DimensionesProductoModel = db.DimensionesProductoModel;

class DimensionesProductoRepository {

     getById = async (id, paranoid = true) => {
        const data = await DimensionesProductoModel.findByPk(id,{paranoid});
        return data;
    }


     getAll = async (paranoid = true) => {
        const { rows, count } = await DimensionesProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


     getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await DimensionesProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


     create = async (data, transaction) => {
        const newRecord = await DimensionesProductoModel.create(data, {transaction});
        return newRecord;
    }


     update = async (id, data, transaction ) => {
        let [record, created] = await DimensionesProductoModel.findOrCreate({
            where: {id},
            defaults: data,
            transaction,
            paranoid:false
        });
        if (created) return { data: record, created };
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.producto_id = data.producto_id;
        record.dimensiones_id = data.dimensiones_id;
        
        await record.save();

        return {data: record, created};
    }


     hardDelete = async (id, transaction) => {
        const result = await DimensionesProductoModel.destroy({where: {id}},{transaction, force: true, paranoid: false}); 
        return {id, result};
    }


     softDelete = async (id) => {
        const result = await DimensionesProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }
}

export default DimensionesProductoRepository;