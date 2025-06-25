/**
 * Servicio para obtener una página de tipos de dimensión
 * @class GetPageTipoDimensionesService
 */
class GetPageTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Obtiene una página de tipos de dimensiones
     * @param {number} [page] - Número de página
     * @param {number} [pageSize] - Tamaño de página
     * @param {boolean} [paranoid=true] - Si se incluyen los registros eliminados
     * @returns {Promise<Object>} Objeto con los datos paginados
     */
    execute = async (page = 1, limit = Number(process.env.DEFAULT_REG_POR_PAGINA), paranoid = true) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.repository.getPage(offset, limit, [['nombre', 'ASC']], paranoid);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageTipoDimensionesService;