import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';

/**
 * Servicio encargado de eliminar un menú de la tienda en la base d datos .
 * @class HardDeleteMenuTiendaService
 * @constructor
 * @param {MenuTiendaRepository} repository - Repositorio de menús de la tienda
 * @description Esta clase se encarga de eliminar un menú de la tienda en la base de datos.
 */
class HardDeleteMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina un menú de la tienda de forma permanente.
     * @param {number} id - ID del menú de la tienda a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina un menú de la tienda de la base de datos de forma permanente.
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}



export default HardDeleteMenuTiendaService;