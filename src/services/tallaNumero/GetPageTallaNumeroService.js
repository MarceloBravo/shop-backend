import TallaNumeroRepository from '../../repositories/TallaNumeroRepository.js';

/**
 * Servicio para obtener una página de tallas numéricas
 * @class GetPageTallaNumeroService
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de obtener una página de tallas numéricas de la base de datos.
 * */
class GetPageTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de tallas numéricas.
     * @param {number} [pag=1] - Número de página.
     * @param {number} [limit=process.env.DEFAULT_REG_POR_PAGINA] - Registros por página.
     * @param {boolean} [paranoid=true] - Si es true, excluye registros eliminados.
     * @returns {Promise<{rows: Array, count: number, totPag: number}>} - Datos paginados.
     * */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit, [['valor', 'ASC']], paranoid);
    }
}

export default GetPageTallaNumeroService;