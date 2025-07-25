/**
 * Servicio para eliminar una marca de forma suave
 * @class SoftDeleteMarcaService
 */
class SoftDeleteMarcaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de marcas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación suave de una marca
     * @param {number} id - ID de la marca a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Marca eliminada
     */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return record;
    }
}

export default SoftDeleteMarcaService;