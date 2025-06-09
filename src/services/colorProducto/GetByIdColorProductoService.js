/**
 * Servicio para obtener un color de producto por su ID
 * @class GetByIdColorProductoService
 */
class GetByIdColorProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de un color de producto por su ID
     * @param {string|number} id - ID del color de producto a obtener
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el color de producto si está eliminado
     * @returns {Promise<Object>} Color de producto encontrado
     */
    execute = async (id, paranoid = true) => {
        const result = await this.repository.getById(id, paranoid);
        if (!result) {
            throw new Error('Color de producto no encontrado');
        }
        return result;
    }
}

export default GetByIdColorProductoService;