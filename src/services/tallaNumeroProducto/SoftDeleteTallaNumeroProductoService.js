import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';

/**
 * Servicio para marcar como borrado una relación talla numerica-producto en la base de datos.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de marcar como borrado una relación talla numerica-producto de la base de datos.
 */
class SoftDeleteTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una relación talla numerica-producto de forma suave (soft delete).
     * @param {number} id - ID del menú a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una relación talla numerica-producto de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const { record } = await this.repository.softDelete(id, transaction);
        return record;
    }

}


export default SoftDeleteTallaNumeroProductoService;