/**
 * Servicio para obtener todas las categorías
 * @class GetAllCategoriaService
 */
class GetAllCategoriaService {
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
     * Ejecuta la obtención de todas las categorías
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las categorías eliminadas
     * @returns {Promise<Array>} Lista de categorías
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllCategoriaService;