import { TallaLetraProductoModel } from "../models/TallaLetraProductoModel.js";

class TallaLetraProductoRepository{
    getById = async (id, paranoid = true) => {
        const data = await TallaLetraProductoModel.findByPk(id, {
            include: [
                {
                    model: TallaLetraModel, // Modelo relacionado
                    as: 'talla_letra'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await TallaLetraProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            include: [
                {
                    model: TallaLetraModel, // Modelo relacionado
                    as: 'talla_letra'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await TallaLetraProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction = null) => {
        const newRecord = await TallaLetraProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction = null) => {
        let [record, created] = await TallaLetraProductoModel.findOrCreate({
            where: {id},
            defaults: data,
            paranoid: false,
            transaction
        });
        if(created) return {data: record, created};
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.producto_id = data.producto_id;
        record.talla_letra_id = data.talla_letra_id;
        
        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await TallaLetraProductoModel.destroy({where: {id},transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id) => {
        const result = await TallaLetraProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }
}

export default TallaLetraProductoRepository;