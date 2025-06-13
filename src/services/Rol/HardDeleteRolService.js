/**
 * Servicio para realizar borrado físico de un rol
 * @class HardDeleteRolService
 */
class HardDeleteRolService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de roles
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado físico de un rol
     * @param {string|number} id - ID del rol a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Rol no encontrado');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteRolService;