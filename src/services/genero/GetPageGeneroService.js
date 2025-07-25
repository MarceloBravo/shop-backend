/**
 * Servicio para obtener una página de registros de género
 * @class GetPageGeneroService
 */
class GetPageGeneroService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de géneros
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de registros de género
     * @param {number} page - Número de página
     * @param {number} limit - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben excluir los registros eliminados
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const offset = (page - 1) * limit;
        const result = await this.repository.getPage(offset, limit, paranoid);
        return result;
    }
}

export default GetPageGeneroService;