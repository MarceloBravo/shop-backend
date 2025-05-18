import MarcaRepository from '../../repositories/MarcaRepository.js';


/**
 * Clase para obtener una página de marcas.
 * @class GetPageMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de obtener una página de marcas de la base de datos.
 * */
class GetPageMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una página de marcas de la base de datos.
     * @param {number} pag - Número de página a obtener.
     * @param {number} limit - Número máximo de marcas por página.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Array>} - Devuelve un array con las marcas de la página solicitada.
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        return await this.repository.getPage(desde, limit, paranoid);
    }
}

export default GetPageMarcaService;