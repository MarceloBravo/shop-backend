import { CategoriaModel } from "../../models/CategoriaModel.js";

class CategoriaRepository {
    
    getById = async (id, paranoid = true) => {
        const data = await CategoriaModel.findByPk(id, {paranoid});
        return data;
    }


    getBy = async (campo, valor, paranoid = true) => {
        const where = {};
        where[campo] = valor;
        const data = await CategoriaModel.findOne({where, paranoid});
        return data;
    }
    

    getAll = async (paranoid = true) => {
        const { rows, count } = await CategoriaModel.findAndCountAll({
            order: [['nombre','ASC']],
            paranoid
        });
        return {data: rows, count};
    }


    getPage = async (desde, regPorPag, paranoid = true) => {
        const { rows , count } = await CategoriaModel.findAndCountAll({
            offset:desde,
            limit: regPorPag,
            order: [['nombre','ASC']],
            paranoid
        });
        return {rows, count, totPag: Math.ceil(count / regPorPag)};
    }


    create = async (values, transaction = null) => {
        const data = await CategoriaModel.create(values, {transaction});
        return data;
    }


    update = async (id, data, transaction = null) => {
        let [ Categoria, created ] = await CategoriaModel.findOrCreate({where:{id}, defaults: data, transaction, paranoid:false});
        if(created) return {data: Categoria, created};
        // Si el registro ya existe, actualiza los valores
        if(Categoria.deleted_at !== null) {
            await Categoria.restore({transaction});
            created = true;
        }
        Categoria.nombre = data.nombre;
        Categoria.descripcion = data.descripcion;

        await Categoria.save();

        return {data: Categoria, created};
    }


    hardDelete = async (id, transaction = null) => {
        const result = await CategoriaModel.destroy({where: {id}, transaction, paranoid: false, force: true});
        return {id, result};
    }


    softDelete = async (id, transaction = null) => {
        const result = await CategoriaModel.destroy({where: {id}, transaction});
        return {id, result};
    }

}

export default CategoriaRepository;