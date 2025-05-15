import { AccionesPantallaModel } from "../../models/AccionesPantallaModel.js";

class AccionesPantallaRepository{

    getOne = async (id) => {
        const data = await AccionesPantallaModel.findByPk(id);
        return (data && data.deleted_at == null) ? data : null;
    }


    getAll = async () => {
        const { rows, count } = await AccionesPantallaModel.findAndCountAll({
            where: {deleted_at: null},
            order: [['pantalla_id','ASC']]
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10) => {
        const { rows , count } = await AccionesPantallaModel.findAndCountAll({
            where: {deleted_at: null},
            offset:desde,
            limit: regPorPag,
            order: [['pantalla_id','ASC']]
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await AccionesPantallaModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
        const [ record, created ] = await AccionesPantallaModel.findOrCreate({where:{id}, defaults: data, transaction});
        if(created) return {data: record, created};
        // Si el registro ya existe, actualiza los valores
        record.pantalla_id = data.pantalla_id;
        record.permite_crear = data.permite_crear;
        record.permite_actualizar = data.permite_actualizar;
        record.permite_eliminar = data.permite_eliminar;
        record.permite_listar = data.permite_listar;
        record.acceso = data.acceso;
        record.deleted_at = null;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction) => {
        const result = await AccionesPantallaModel.destroy({where: {id}, transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id, transaction) => {
        const result = await AccionesPantallaModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default AccionesPantallaRepository;