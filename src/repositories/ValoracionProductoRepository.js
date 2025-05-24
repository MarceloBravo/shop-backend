import { ValoracionProductoModel } from "../../models/ValoracionProductoModel.js";

class ValoracionProductoRepository{
    getById = async (id, paranoid = true) => {
        const data = await ValoracionProductoModel.findByPk(id, {paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await ValoracionProductoModel.findAndCountAll({
            order: [['estrellas','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde, regPorPag, paranoid = true) => {
        const { rows , count } = await ValoracionProductoModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['estrellas','ASC']],
            paranoid
        });
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await ValoracionProductoModel.create(values, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        let [ record, created ] = await ValoracionProductoModel.findOrCreate({where:{id}, transaction, defaults: data, paranoid: false});
        if(created) return {data: record, created};
        if(record.deleted_at !== null) {
            await record.restore({transaction});
            created = true;
        }
        // Si el registro ya existe, actualiza los valores
        record.producto_id = data.producto_id;
        record.estrellas = data.estrellas;
        record.comentario = data.comentario;
        record.email = data.email;
        record.nombre = data.nombre;
        record.foto = data.foto;
        record.deleted_at = null;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await ValoracionProductoModel.destroy({where: {id}, transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await ValoracionProductoModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default ValoracionProductoRepository;