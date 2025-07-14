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
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el color si está eliminado
     * @returns {Promise<Object>} Color encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            const error = new Error('Color no encontrado');
            error.code = 404;
            throw error;
        }
        return result;
    }
}

export default GetByIdColorService;