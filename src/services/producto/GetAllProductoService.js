/**
 * Servicio para obtener todos los productos
 * @class GetAllProductoService
 */
class GetAllProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los productos
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los productos eliminados
     * @param {Object} [filter={}] - Filtros adicionales para la búsqueda
     * @returns {Promise<Array>} Lista de productos
     */
    execute = async (paranoid = true, filter = {}) => {
        return await this.repository.getAll(paranoid, filter);
    }
}

export default GetAllProductoService;