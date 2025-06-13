/**
 * Servicio para obtener todos los roles
 * @class GetAllRolService
 */
class GetAllRolService {
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
     * Ejecuta la obtención de todos los roles
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los roles eliminados
     * @returns {Promise<Array>} Lista de roles
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllRolService;