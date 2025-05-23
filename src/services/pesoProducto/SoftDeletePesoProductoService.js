import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';

/**
 * Servicio para realizar eliminación lógica de registros de peso de productos
 * @class
 * @description Gestiona la eliminación lógica (soft delete) de registros de peso de productos
 */
class SoftDeletePesoProductoService {
    /**
     * Crea una instancia del servicio de eliminación lógica de pesos de productos
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza la eliminación lógica de un registro de peso de producto
     * @param {number} id - Identificador único del registro a eliminar
     * @param {Object} [transaction] - Transacción de Sequelize para operaciones atómicas
     * @returns {Promise<Object>} Registro eliminado lógicamente
     * @throws {Error} Si no se encuentra el registro o hay un error en la eliminación
     */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return record;
    }
}

export default SoftDeletePesoProductoService;