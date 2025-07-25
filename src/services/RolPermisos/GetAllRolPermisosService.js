/**
 * Servicio para obtener todos los permisos de roles
 * @class GetAllRolPermisosService
 */
class GetAllRolPermisosService {
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
     * Ejecuta la obtención de todos los permisos de roles
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los permisos eliminados
     * @returns {Promise<Array>} Lista de permisos de roles
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllRolPermisosService;