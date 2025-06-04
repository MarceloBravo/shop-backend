/**
 * Servicio para eliminar permanentemente un material
 * @class HardDeleteMaterialService
 */
class HardDeleteMaterialService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación permanente de un material
     * @param {number} id - ID del material a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Resultado de la eliminación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Material no encontrado');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteMaterialService;