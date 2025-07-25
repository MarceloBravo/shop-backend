/**
 * Servicio para obtener una categoría por su ID
 * @class GetByIdCategoriaService
 */
class GetByIdCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de categorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una categoría por su ID
     * @param {string|number} id - ID de la categoría a obtener
     * @param {boolean} [includeDeleted=false] - Indica si se debe incluir la categoría si está eliminada
     * @returns {Promise<Object>} Categoría encontrada
     */
    execute = async (id, includeDeleted = false) => {
        const result = await this.repository.getById(id, includeDeleted);
        if (!result) {
            throw new Error('Categoría no encontrada');
        }
        return result;
    }
}

export default GetByIdCategoriaService;