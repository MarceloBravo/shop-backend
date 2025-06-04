/**
 * Servicio para eliminar lógicamente un material
 * @class SoftDeleteMaterialService
 */
class SoftDeleteMaterialService {
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
     * Ejecuta la eliminación lógica de un material
     * @param {number} id - ID del material a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<number>} Código de estado HTTP (200 si se eliminó, 404 si no se encontró)
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Material no encontrado');
        }
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteMaterialService;