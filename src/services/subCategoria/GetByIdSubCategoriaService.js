/**
 * Servicio para obtener una subcategoría por su ID
 * @class GetByIdSubCategoriaService
 */
class GetByIdSubCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de subcategorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una subcategoría por su ID
     * @param {string|number} id - ID de la subcategoría a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la subcategoría si está eliminada
     * @returns {Promise<Object>} Subcategoría encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Subcategoría no encontrada');
        }
        return result;
    }
}

export default GetByIdSubCategoriaService;