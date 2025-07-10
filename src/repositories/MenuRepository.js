import { MenuModel } from "../models/MenuModel.js";

class MenuRepository{
    getById = async (id, paranoid = true) => {
        const data = await MenuModel.findByPk(id, {paranoid});
        return data;
    }


    getAll = async (paranoid = true) => {
        const { rows, count } = await MenuModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde = 1, regPorPag = 10, paranoid = true) => {
        const { rows , count } = await MenuModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });    
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (valor, transaction = null) => {
        const data = await MenuModel.create(valor, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        let [ record, created ] = await MenuModel.findOrCreate({where:{id}, defaults: data, transaction, paranoid: false});
        if(created) return {data: record, created};
        // Si el registro ya existe, actualiza los valores
        if(record.deletedAt !== null) {
            await record.restore({transaction});
            created = true;
        }
        record.nombre = data.nombre;
        record.icono = data.icono;
        record.menu_padre_id = data.menu_padre_id;
        record.uri = data.uri;
        record.posicion = data.posicion;
        record.pantalla_id = data.pantalla_id;

        await record.save();

        return {data: record, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await MenuModel.destroy({where: {id}, force: true, paranoid: false, transaction});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await MenuModel.destroy({where: {id}, transaction});
        return {id, result};
        
    }
}

export default MenuRepository;