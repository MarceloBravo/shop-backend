/**
 * Servicio para obtener todos los colores de producto
 * @class GetAllColorProductoService
 */
class GetAllColorProductoService {
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
     * Ejecuta la obtención de todos los colores de producto
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los colores de producto eliminados
     * @returns {Promise<Array>} Lista de colores de producto
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }       
}

export default GetAllColorProductoService;