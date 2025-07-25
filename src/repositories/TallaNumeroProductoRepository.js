import { TallaNumericaProductoModel } from "../models/TallaNumericaProductoModel.js";

class TallaNumeroProductoRepository{
    getById = async (id, paranoid = true) => {
        const data = await TallaNumericaProductoModel.findByPk(id, {
            include: [
                {
                    model: TallaNumericaModel, // Modelo relacionado
                    as: 'tallas_numericas'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await TallaNumericaProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            include: [
                {
                    model: TallaNumericaModel, // Modelo relacionado
                    as: 'tallas_numericas'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await TallaNumericaProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction = null) => {
        const newRecord = await TallaNumericaProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction = null) => {
        let [record, created] = await TallaNumericaProductoModel.findOrCreate({
            where: {id},
            defaults: data,
            paranoid: false
        },
            {transaction}
        );
        if (created) return { data: record, created };
        if (created) return { data: record, created };
        if (record.deletedAt !== null) {
            await record.restore({ transaction });
            created = true;
        }
        record.producto_id = data.producto_id;
        record.talla_numerica_id = data.talla_numerica_id;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await TallaNumericaProductoModel.destroy({where: {id},transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction =  null) => {
        const result = await TallaNumericaProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }
}

export default TallaNumeroProductoRepository;