import PesoProductoRepository from '../../repositories/PesoProductoRepository.js';

/**
 * Servicio para obtener registros de peso de productos de forma paginada
 * @class
 * @description Gestiona la recuperación paginada de registros de peso de productos
 */
class GetPagePesoProductoService {
    /**
     * Crea una instancia del servicio de paginación de pesos de productos
     * @param {PesoProductoRepository} repository - Repositorio para operaciones con pesos de productos
     */
    constructor(repository = new PesoProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de registros de peso de productos
     * @param {number} [pag=1] - Número de página a obtener
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - Cantidad de registros por página
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * 
     * @returns {Promise<Object>} Objeto con los registros paginados y metadata:
     *      @property {Array<Object>} rows - Lista de registros de la página actual
     *      @property {number} count - Total de registros
     *      @property {number} totalPages - Total de páginas
     * 
     * @throws {Error} Si hay un error al obtener los registros
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}


export default GetPagePesoProductoService;