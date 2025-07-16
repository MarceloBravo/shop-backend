import { RolModel } from "../models/RolModel.js";

class RolRepository{
    getById = async (id, paranoid = true) => {
        const data = await RolModel.findByPk(id, {paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await RolModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde, regPorPag, paranoid = true) => {
        const { rows , count } = await RolModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await RolModel.create(values, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        const [ Rol, created ] = await RolModel.findOrCreate({where:{id}, transaction, defaults: data});
        if(created) return {data: Rol, created};
        // Si el registro ya existe, actualiza los valores
        Rol.nombre = data.nombre;
        Rol.deleted_at = null;

        await Rol.save();

        return {data: Rol, created};
    }


    hardDelete = async (id, transaction) => {
        const result = await RolModel.destroy({where: {id}, transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id, transaction) => {
        const result = await RolModel.destroy({where: {id}, transaction});
        return {id, result};
    }

}

export default RolRepository;