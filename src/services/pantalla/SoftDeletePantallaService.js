import PantallaRepository from '../../repositories/PantallaRepository.js';

/**
 * Servicio para marcar como borrado una pantalla en la base de datos.
 * @class SoftDeletePantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de pantallas.
 * @description Esta clase se encarga de marcar como borrado una pantalla de la base de datos.
 */
class SoftDeletePantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una pantalla de forma suave (soft delete).
     * @param {number} id - ID de la pantalla a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una pantalla de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const {result} = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeletePantallaService;