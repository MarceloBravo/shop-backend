/**
 * Servicio para obtener un color por su ID
 * @class GetByIdColorService
 */
class GetByIdColorService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un color por su ID
     * @param {string|number} id - ID del color a obtener
     * @param {boolean} [includeDeleted=false] - Indica si se debe incluir el color si está eliminado
     * @returns {Promise<Object>} Color encontrado
     */
    execute = async (id, includeDeleted = false) => {
        const result = await this.repository.getById(id, includeDeleted);
        if (!result) {
            throw new Error('Color no encontrado');
        }
        return result;
    }
}

export default GetByIdColorService;