import { SubCategoriaModel } from "../models/SubCategoriaModel.js";

class SubCategoriaRepository{
    getById = async (id, paranoid = true) => {
        const data = await SubCategoriaModel.findByPk(id, { paranoid });
        return data;
    }

    getAll = async (orderBy = [['nombre', 'ASC']], paranoid = true) => {
        const { rows, count } = await SubCategoriaModel.findAndCountAll({
            order: orderBy,
            paranoid
        });
        return {data: rows, count};
    }

    getPage = async (desde = 1, regPorPag = 10, orderBy = [['nombre', 'ASC']], paranoid = true) => {
        const { rows , count } = await SubCategoriaModel.findAndCountAll({
            offset: desde,
            limit: regPorPag,
            order: orderBy,
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }

    create = async (valor, transaction = null) => {
        const data = await SubCategoriaModel.create(valor, { transaction });
        return data;
    }

    update = async (id, data, transaction = null) => {
        let [ record, created ] = await SubCategoriaModel.findOrCreate({
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
        
        record.nombre = data.nombre;
        record.categoria_id = data.categoria_id;

        await record.save({ transaction });
        return {data: record, created};
    }

    hardDelete = async (id, transaction = null) => {
        const result = await SubCategoriaModel.destroy({
            where: {id},
            force: true,
            paranoid: false,
            transaction
        });
        return {id, result};
    }

    softDelete = async (id, transaction = null) => {
        const result = await SubCategoriaModel.destroy({
            where: {id},
            transaction
        });
        return {id, result};
    }
}

export default SubCategoriaRepository;