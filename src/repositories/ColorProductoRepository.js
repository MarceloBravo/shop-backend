import { ColorProductoModel } from "../../models/ColorProductoModel.js";

class ColorProductoRepository {

    getById = async (id, paranoid = true) => {
        const data = await ColorProductoModel.findByPk(id, {
            include: [
                {
                    model: ColorModel, // Modelo relacionado
                    as: 'color'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await ColorProductoModel.findAndCountAll({
            where: {deleted_at: null},
            order: [['producto_id','ASC']],
            include: [
                {
                    model: ColorModel, // Modelo relacionado
                    as: 'color'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await ColorProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await ColorProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
        let [record, created] = await ColorProductoModel.findOrCreate({
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
        record.color_id = data.color_id;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction) => {
        const result = await ColorProductoModel.destroy({where: {id}},{transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id) => {
        const result = await ColorProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }

}

export default ColorProductoRepository;