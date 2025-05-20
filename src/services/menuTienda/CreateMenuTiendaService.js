import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo menú de la tienda.
 * @class CreateMenuTiendaService
 * @constructor
 * @param {MenuTiendaRepository} repository - Repositorio de menús de la tienda.
 * @description Esta clase se encarga de crear un nuevo menú de la tienda en la base de datos.
 * */
class CreateMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Crea un nuevo menú de la tienda en la base de datos.
     * @param {Object} data - Datos del menú a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú  de la tienda creado.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateMenuTiendaService;