import MenuRepository from '../../repositories/MenuRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un menú existente.
 * @class
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de actualizar un menú existente en la base de datos.
 */
class UpdateMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza un menú en la base de datos.
     * @param {number} id - ID del menú a actualizar.
     * @param {Object} data - Datos del menú a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú actualizado.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data, id);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateMenuService;