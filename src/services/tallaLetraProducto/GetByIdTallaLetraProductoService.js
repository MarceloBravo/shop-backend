/**
 * Servicio para obtener una asociación entre talla letra y producto por su ID
 * @class GetByIdTallaLetraProductoService
 */
class GetByIdTallaLetraProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una asociación por su ID
     * @param {string|number} id - ID de la asociación a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir la asociación si está eliminada
     * @returns {Promise<Object>} Asociación encontrada
     * @throws {Error} Si la asociación no es encontrada
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Asociación no encontrada');
        }
        return result;
    }
}

export default GetByIdTallaLetraProductoService;