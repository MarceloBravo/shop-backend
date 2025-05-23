import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';

/**
 * Servicio para obtener una página de asociaciones de tallas de letra y productos
 * @class
 * @description Gestiona la recuperación paginada de asociaciones entre productos y tallas de letra
 */
class GetPageTallaLetraProductoService {
    /**
     * Crea una instancia del servicio de paginación
     * @param {TallaLetraProductoRepository} repository - Repositorio de tallas de letra de productos
     */
    constructor(repository = new TallaLetraProductoRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de asociaciones entre productos y tallas de letra
     * @param {number} [page=1] - Número de página a obtener
     * @param {number} [pageSize=process.env.DEFAULT_REG_POR_PAGINA] - Cantidad de registros por página
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * @returns {Promise<Object>} Objeto con los registros paginados y metadata
     * @throws {Error} Si hay un error al obtener los registros
     */
    async execute(pag = 1, limit = Number(process.env.DEFAULT_REG_POR_PAGINA), paranoid = true) {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageTallaLetraProductoService;