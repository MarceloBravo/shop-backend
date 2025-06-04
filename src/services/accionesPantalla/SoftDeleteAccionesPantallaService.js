/**
 * Servicio para eliminar una acción de pantalla de forma suave
 * @class SoftDeleteAccionesPantallaService
 */
class SoftDeleteAccionesPantallaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de acciones de pantalla
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación suave de una acción de pantalla
     * @param {number} id - ID de la acción de pantalla a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Acción de pantalla eliminada
     */
    execute = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return record;
    }
}

export default SoftDeleteAccionesPantallaService;