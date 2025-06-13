/**
 * Servicio para obtener todas las tallas numéricas
 * @class GetAllTallaNumeroService
 */
class GetAllTallaNumeroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas numéricas
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de todas las tallas numéricas
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las tallas eliminadas
     * @returns {Promise<Array>} Lista de tallas numéricas
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['valor', 'ASC']], paranoid);
    }
}

export default GetAllTallaNumeroService;