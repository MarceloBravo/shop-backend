/**
 * Servicio para obtener un rol por su ID
 * @class GetByIdRolService
 */
class GetByIdRolService {
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
     * Ejecuta la obtención de un rol por su ID
     * @param {string|number} id - ID del rol a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el rol si está eliminado
     * @returns {Promise<Object>} Rol encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Rol no encontrado');
        }
        return result;
    }
}

export default GetByIdRolService;