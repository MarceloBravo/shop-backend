import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';

/**
 * Servicio para obtener una página de tallas letra
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de obtener una página de tallas letra de la base de datos.
 * */
class GetPageTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de tallas letra.
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

export default GetPageTallaLetraService;