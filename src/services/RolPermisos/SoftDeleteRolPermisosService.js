/**
 * Servicio para realizar borrado lógico de un permiso de rol
 * @class SoftDeleteRolPermisosService
 */
class SoftDeleteRolPermisosService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de permisos de roles
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta el borrado lógico de un permiso de rol
     * @param {string|number} id - ID del permiso de rol a borrar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Permiso de rol no encontrado');
        }
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }
}

export default SoftDeleteRolPermisosService;