import { AtributosProductoModel } from "../../models/AtributosProductoModel.js";

class AtributoProductoRepository{

    getById = async (id, paranoid = true) => {
        const data = await AtributosProductoModel.findByPk(id, {
            include: [
                {
                    model: AtributosModel, // Modelo relacionado
                    as: 'atributos'
                }
            ],
            paranoid
        });

        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await AtributosProductoModel.findAndCountAll({
            order: [['producto_id','ASC']],
            include: [
                {
                    model: AtributosModel, // Modelo relacionado
                    as: 'atributos'
                }
            ],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await AtributosProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['producto_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await AtributosProductoModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
        const [record, created] = await AtributosProductoModel.findOrCreate({
            where: {id},
            defaults: data, 
            transaction
        });
        record.producto_id = data.producto_id;
        record.atributo_id = data.atributo_id;
        if (created) return { data: record, created };

        // Si el registro ya existe, actualiza los valores
        record.deleted_at = null;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction, paranoid = true) => {
        const result = await AtributosProductoModel.destroy({where: {id},transaction, force: true, paranoid});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await AtributosProductoModel.destroy({where: {id},transaction});
        return {id, result};
    }


    isCheckInUse = async (idAtributo) => {
        const relacionesRestantes = await AtributosProductoModel.count({ where: { atributo_id: idAtributo } });
        return relacionesRestantes > 0;
    }
}

export default AtributoProductoRepository;