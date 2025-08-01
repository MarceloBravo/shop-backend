/**
 * Servicio para eliminar permanentemente un atributo
 * @class HardDeleteAtributoService
 */
class HardDeleteAtributoService {
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
     * Ejecuta la eliminación permanente de un atributo
     * @param {number} id - ID del atributo a eliminar
     * @param {Transaction} [transaction] - Transacción de Sequelize para manejar la eliminación
     * @returns {Promise<Object>} Resultado de la eliminación
     */
    execute = async (id, transaction = null) => {
        const registro = await this.repository.getById(id, false);
        if (!registro) {    
            const error = new Error('Registro no encontrado');
            error.code = 404;
            throw error;
        }   
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteAtributoService;