/**
 * Servicio para realizar borrado lógico de un rol
 * @class SoftDeleteRolService
 */
class SoftDeleteRolService {
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
     * Ejecuta el borrado lógico de un rol
     * @param {string|number} id - ID del rol a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Rol no encontrado');
        }
        const record = await this.repository.softDelete(id, transaction);
        return record && record.deleted_at !== null;
    }
}

export default SoftDeleteRolService;