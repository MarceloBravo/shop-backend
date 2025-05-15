import { RolModel } from "../../models/RolModel.js";

class RolRepository{
    getOne = async (id) => {
        const data = await RolModel.findByPk(id);
        return (data && data.deleted_at == null) ? data : null;
    }


    getAll = async () => {
        const { rows, count } = await RolModel.findAndCountAll({
            where: {deleted_at: null},
            order: [['nombre','ASC']]
        });
        return {data: rows, count};
    }


    getPage = async (desde, regPorPag) => {
        const { rows , count } = await RolModel.findAndCountAll({
            where: {deleted_at: null},
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']]
        });
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values) => {
        const data = await RolModel.create(values);
        return data;
    }


    update = async (id, data) => {
        const [ Rol, created ] = await RolModel.findOrCreate({where:{id}, defaults: data});
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