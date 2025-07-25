/**
 * Servicio para obtener todas las asociaciones entre tallas numéricas y productos
 * @class GetAllTallaNumeroProductoService
 */
class GetAllTallaNumeroProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas numéricas-producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las asociaciones
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las asociaciones eliminadas
     * @returns {Promise<Array>} Lista de asociaciones
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllTallaNumeroProductoService;