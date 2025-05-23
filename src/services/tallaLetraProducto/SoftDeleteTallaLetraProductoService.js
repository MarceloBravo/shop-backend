import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';

/**
 * Servicio para marcar como borrado una relación tallaLetra-producto en la base de datos.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de marcar como borrado una relación tallaLetra-producto de la base de datos.
 */
class SoftDeleteTallaLetraProductoService{
    constructor(repository = new TallaLetraProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una relación tallaLetra-producto de forma suave (soft delete).
     * @param {number} id - ID del menú a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una relación tallaLetra-producto de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteTallaLetraProductoService;