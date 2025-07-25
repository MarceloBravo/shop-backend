/**
 * Servicio para obtener una página de asociaciones entre tallas letra y productos
 * @class GetPageTallaLetraProductoService
 */
class GetPageTallaLetraProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de asociaciones
     * @param {number} page - Número de página
     * @param {number} limit - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las asociaciones eliminadas
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (pag = 1, limit = Number(process.env.DEFAULT_REG_POR_PAGINA), paranoid = true) => {
        const desde = (pag - 1) * limit;
        const { rows, count } = await this.repository.getPage(desde, limit, paranoid);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageTallaLetraProductoService;