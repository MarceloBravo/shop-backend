import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';

/**
 * Servicio encargado de marcar con soft-delete un regístro de tipo de dimensiones
 * @class softDeleteTipoDimensionesService
 * @constructor
 * @param {TipoDimensionesRepository} repository - Repositorio de tipo de dimensiones
 * @description - Clase encargada de marcar un regístro de tipo de dimensiones como eliminado, con soft-delete.
 */
class softDeleteTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()){
        this.repository = repository;
    }

    /**
     * Se encarga de marcar un regístro como eliminado.
     * @param {number} [id] - ID del regístro a eliminar con borrado suave 
     * @param {object} transaction - Objeto que puede contiene la transacción en la cual se borrará el regístro
     * @returns {Promise<Object>} - Resultado de la operación.
     */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }
}

export default softDeleteTipoDimensionesService;