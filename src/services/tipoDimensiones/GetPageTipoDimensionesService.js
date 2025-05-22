import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';

/**
 * Servicio para obtener una página se tipo de dimensión.
 * @class GetPageTipoDimensionesService
 * @constructor
 * @param {TipoDimensionesRepository} repository - Repositorio de tipos de dimensiones.
 * @description Esta clase se encarga de obtener una página de tipo de dimensiones de la base de datos.
 * */
class GetPageTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Obtiene una página de tipos de dimensiones
     * @param {number} [page] - Número de página
     * @param {number} [pageSize] - Tamaño de página
     * @param {boolean} [paranoid=true] - Si se incluyen los registros eliminados
     * @returns {Promise<Object>} Objeto con los datos paginados
     */
    async execute(page = 1, limit = Number(process.env.DEFAULT_REG_POR_PAGINA), paranoid = true) {
        const desde = (page - 1) * limit;
        return await this.repository.getPage(desde, limit, [['nombre', 'ASC']], paranoid);
    }
}

export default GetPageTipoDimensionesService;