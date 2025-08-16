/**
 * Servicio para obtener una valoración de producto por su ID
 * @class GetByIdValoracionProductoService
 */
class GetByIdValoracionProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de valoraciones de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una valoración de producto por su ID
     * @param {string|number} id - ID de la valoración a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la valoración si está eliminada
     * @returns {Promise<Object>} Valoración encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            const error = new Error('Valoración no encontrada');
            error.code = 404;
            throw error;
        }
        return result;
    }
}

export default GetByIdValoracionProductoService;