import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';

/**
 * Servicio para realizar eliminación permanente de registros de peso de productos
 * @class
 * @description Gestiona la eliminación permanente (hard delete) de registros de peso de productos
 */
class HardDeletePesoProductoService {
    /**
     * Crea una instancia del servicio de eliminación permanente de pesos de productos
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Realiza la eliminación permanente de un registro de peso de producto
     * @param {number} id - Identificador único del registro a eliminar
     * @param {Object} [transaction] - Transacción de Sequelize para operaciones atómicas
     * @returns {Promise<boolean>} true si el registro fue eliminado, false si no se encontró
     * @throws {Error} Si hay un error durante la eliminación
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}
export default HardDeletePesoProductoService;