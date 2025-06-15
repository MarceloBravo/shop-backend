/**
 * Servicio para obtener todas las valoraciones de productos
 * @class GetAllValoracionProductoService
 */
class GetAllValoracionProductoService {
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
     * Ejecuta la obtención de todas las valoraciones de productos
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las valoraciones eliminadas
     * @returns {Promise<Array>} Lista de valoraciones
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllValoracionProductoService;