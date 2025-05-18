import MenuRepository from '../../repositories/MenuRepository.js';

/**
 * Servicio para marcar como borrado  un menú en la base de datos.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de marcar como borrado un menú de la base de datos.
 */
class SoftDeleteMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }   

    /**
     * Elimina un menú de forma suave (soft delete).
     * @param {number} id - ID del menú a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina un menú de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteMenuService;