import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';

/**
 * Servicio para marcar como borrado  un menú de la tienda en la base de datos.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús de la tienda.
 * @description Esta clase se encarga de marcar como borrado un menú de la tienda de la base de datos.
 */
class SoftDeleteMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina un menú de la tienda de forma suave (soft delete).
     * @param {number} id - ID del menú de la tienda a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina un menú de la tienda de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}


export default SoftDeleteMenuTiendaService;