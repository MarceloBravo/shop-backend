/**
 * Servicio para obtener una página de tallas letra
 * @class GetPageTallaLetraService
 */
class GetPageTallaLetraService {
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
     * Ejecuta la obtención de una página de tallas letra
     * @param {number} page - Número de página
     * @param {number} limit - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las tallas letra eliminadas
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.repository.getPage(offset, limit, [['valor', 'ASC']], paranoid);
        const totPag = Math.ceil(count / limit);
        return { rows, count, totPag };
    }
}

export default GetPageTallaLetraService;