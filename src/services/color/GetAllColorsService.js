/**
 * Servicio para obtener todos los colores
 * @class GetAllColorService
 */
class GetAllColorService {  
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los colores
     * @param {boolean} [paranoid=true] - Indica si se deben excluir los registros eliminados
     * @returns {Promise<Array>} Lista de colores
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}       

export default GetAllColorService;