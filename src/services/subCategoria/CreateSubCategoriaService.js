import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva subcategoría.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de crear una nueva subcategoría en la base de datos.
 * */
class CreateSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Crea una nueva subcategoría en la base de datos.
     * @param {Object} data - Datos de la subcategoría a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La subcategoría creada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateSubCategoriaService;