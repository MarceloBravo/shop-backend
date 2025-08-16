/**
 * Servicio para obtener una página de valoraciones de productos
 * @class GetPageValoracionProductoService
 */
class GetPageValoracionProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de valoraciones de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la obtención de una página de valoraciones de productos
     * @param {number} page - Número de página
     * @param {number} limit - Límite de registros por página
     * @param {boolean} [paranoid=true] - Indica si se deben incluir las valoraciones eliminadas
     * @returns {Promise<Object>} Objeto con los registros, total de registros y total de páginas
     */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {    
        const limitNumber = parseInt(limit, 10);
        const offset = (page - 1) * limitNumber;
        const { rows, count } = await this.repository.getPage(offset, limitNumber, paranoid);
        const totPag = Math.ceil(count / limitNumber);
        return { rows, count, totPag };
    }
}

export default GetPageValoracionProductoService;