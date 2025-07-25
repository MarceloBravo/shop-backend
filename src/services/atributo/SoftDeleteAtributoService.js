/**
 * Servicio para eliminar lógicamente un atributo
 * @class SoftDeleteAtributoService
 */
class SoftDeleteAtributoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de atributos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación lógica de un atributo
     * @param {number} id - ID del atributo a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Resultado de la eliminación
     */
    execute = async (id, transaction = null) => {
        return await this.repository.softDelete(id, transaction);
    }
}   

export default SoftDeleteAtributoService;