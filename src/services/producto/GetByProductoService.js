/**
 * Servicio para obtener un producto por su ID
 * @class GetByProductoService
 */
class GetByProductoService {
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
     * Ejecuta la obtención de un producto
     * @param {string|number} id - ID del producto a obtener
     * @param {boolean} [obtenerPorQuery=false] - Indica si se debe obtener el producto por query
     * @param {boolean} [paranoid=true] - Indica si se debe incluir el producto si está eliminado
     * @returns {Promise<Object>} Producto encontrado
     * @throws {Error} Si no se encuentra el producto
     */
    execute = async (id, obtenerPorQuery = false, paranoid = true) => {
        const result = obtenerPorQuery ? 
            await this.repository.query(id, paranoid) : 
            await this.repository.getById(id, paranoid);
        
        if (!result) {
            throw new Error('Producto no encontrado');
        }
        return result;
    }
}

export default GetByProductoService;