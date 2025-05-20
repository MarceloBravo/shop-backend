import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un menú de la tienda existente.
 * @class UpdateMenuTiendaService
 * @constructor
 * @param {MenuTiendaRepository} repository - Repositorio de menús de la tienda.
 * @description Esta clase se encarga de actualizar un menú de la tienda existente en la base de datos.
 */
class UpdateMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza un menú de la tienda en la base de datos.
     * @param {number} id - ID del menú de la tienda a actualizar.
     * @param {Object} data - Datos del menú a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El menú de la tienda actualizado.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data, id);
        return await this.repository.update(id, data, transaction);
    }

}

export default UpdateMenuTiendaService;