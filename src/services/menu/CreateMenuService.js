import MenuRepository from '../../repositories/MenuRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo menú.
 * @class
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de crear un nuevo menú en la base de datos.
 * */
class CreateMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }

    /**
     * Crea un nuevo menú en la base de datos.
     * @param {Object} data - Datos del menú a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú creado.
     * */
    execute = async (data, transaction = null) =>{
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateMenuService;