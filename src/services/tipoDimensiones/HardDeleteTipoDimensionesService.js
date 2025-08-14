/**
 * Servicio para realizar borrado físico de un tipo de dimensión
 * @class HardDeleteTipoDimensionesService
 */
class HardDeleteTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Elimina un tipo de dimensiones (soft delete)
     * @param {number} id - ID del tipo de dimensiones a eliminar
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            const error = new Error('Registro no encontrado');
            error.code = 404;
            throw error;
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteTipoDimensionesService;