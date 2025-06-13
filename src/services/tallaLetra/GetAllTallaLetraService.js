/**
 * Servicio para obtener todas las tallas letra
 * @class GetAllTallaLetraService
 */
class GetAllTallaLetraService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las tallas letra
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las tallas letra eliminadas
     * @returns {Promise<Array>} Lista de tallas letra
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['valor', 'ASC']], paranoid);
    }
}

export default GetAllTallaLetraService;