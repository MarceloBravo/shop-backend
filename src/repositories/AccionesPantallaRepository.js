import { AccionesPantallaModel } from "../models/AccionesPantallaModel.js";

class AccionesPantallaRepository{

    getById = async (id, paranoid = true) => {
        const data = await AccionesPantallaModel.findByPk(id, {paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await AccionesPantallaModel.findAndCountAll({
            order: [['pantalla_id','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await AccionesPantallaModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['pantalla_id','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (data, transaction) => {
        const newRecord = await AccionesPantallaModel.create(data, {transaction});
        return newRecord;
    }


    update = async (id, data, transaction) => {
        let [ record, created ] = await AccionesPantallaModel.findOrCreate({where:{id}, defaults: data, transaction, paranoid:false});
        if(created) return {data: record, created};
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        // Si el registro ya existe, actualiza los valores
        record.pantalla_id = data.pantalla_id;
        record.permite_crear = data.permite_crear;
        record.permite_actualizar = data.permite_actualizar;
        record.permite_eliminar = data.permite_eliminar;
        record.permite_listar = data.permite_listar;
        record.acceso = data.acceso;

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