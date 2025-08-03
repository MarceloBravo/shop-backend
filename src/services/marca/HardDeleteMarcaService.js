/**
 * Servicio para eliminar una marca de forma permanente
 * @class HardDeleteMarcaService
 */
class HardDeleteMarcaService {
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
     * Ejecuta la eliminación permanente de una marca
     * @param {number} id - ID de la marca a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error('Regístro no encontrado');
            error.code = 404;
            throw error;
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteMarcaService;