/**
 * Servicio para obtener todos los menús
 * @class GetAllMenuService
 */
class GetAllMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todos los menús
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los menús eliminados
     * @returns {Promise<Array>} Lista de menús
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMenuService;