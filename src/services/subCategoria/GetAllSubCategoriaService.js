/**
 * Servicio para obtener todas las subcategorías
 * @class GetAllSubCategoriaService
 */
class GetAllSubCategoriaService {
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
     * Ejecuta la obtención de todas las subcategorías
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las subcategorías eliminadas
     * @returns {Promise<Array>} Lista de subcategorías
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['nombre', 'ASC']], paranoid);
    }
}

export default GetAllSubCategoriaService;