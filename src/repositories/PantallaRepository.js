import db from '../models/index.js';
const PantallaModel = db.PantallaModel;

class PantallaRepository{
    getById = async (id, paranoid = true) => {
        const data = await PantallaModel.findByPk(id, {paranoid});
        return data;
    }
    
    getBy = async (campo, value, paranoid = true) => {
        const where = {[campo]: value}
        const data = await PantallaModel.findOne({where, paranoid});
        return data;
    }

    
    getAll = async (paranoid = true) => {
        const { rows, count } = await PantallaModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await PantallaModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await PantallaModel.create(values, {transaction});
        return data;
    }


    update = async (id, values, transaction = null) => {
        let [ record, created ] = await PantallaModel.findOrCreate({where:{id}, defaults: values, transaction});
        if(created) return {data: record, created};
        // Si el registro ya existe, actualiza los valores
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.nombre = values.nombre;
        record.uri = values.uri;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await PantallaModel.destroy({where: {id}, transaction, force: true, paranoid: false});
        return {id, result};
    }


    softDelete = async (id, transaction) => {
        const result = await PantallaModel.destroy({where: {id}, transaction});
        return {id, result};
    }
}

export default PantallaRepository;
