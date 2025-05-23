import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';

/**
 * Servicio encargado de eliminar una relación tallaLetra-producto de la base d datos .
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús
 * @description Esta clase se encarga de eliminar una relación tallaLetra-producto de la base de datos.
 */
class HardDeleteTallaLetraProductoService{
    constructor(repository = new TallaLetraProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una relación tallaLetra-producto de forma permanente.
     * @param {number} id - ID de la relación a eliminar a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una relación tallaLetra-producto de la base de datos de forma permanente.
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}


export default HardDeleteTallaLetraProductoService;