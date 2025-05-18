import MenuRepository from '../../repositories/MenuRepository.js';

/**
 * Servicio encargado de eliminar un menú de la base d datos .
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús
 * @description Esta clase se encarga de eliminar un menú de la base de datos.
 */
class HardDeleteMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }

    /**
     * Elimina un menú de forma permanente.
     * @param {number} id - ID del menú a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina un menú de la base de datos de forma permanente.
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.hardDelete(id, transaction);
        return result;
    }
}

export default HardDeleteMenuService;