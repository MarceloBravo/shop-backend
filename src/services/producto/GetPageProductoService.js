/**
 * Servicio para obtener una página de productos
 * @class GetPageProductoService
 */
class GetPageProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de productos
     * @param {number} page - Número de página
     * @param {number} limit - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir los productos eliminados
     * @param {Object} [filter={}] - Filtros adicionales para la búsqueda
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true, filter = {}) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.repository.getPage(offset, limit, paranoid, filter);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageProductoService;