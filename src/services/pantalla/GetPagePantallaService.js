import PantallaRepository from '../../repositories/PantallaRepository.js';

/**
 * Clase para obtener una página de registros de la base de datos
 * @class GetPagePantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de pantallas.
 * @description Esta clase se encarga de obtener una página de pantallas de la base de datos.
 */
class GetPagePantallaService{
    constructor(repository= new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una página de pantallas.
     * @param {number} desde - El índice de inicio de la página.
     * @param {number} limit - El número máximo de pantallas por página.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los pantallas no eliminados.
     * @returns {Promise<Object>} - Un objeto que contiene la lista de pantallas y el total de menús.
     * @description Esta función obtiene una página de pantallas de la base de datos.
     * */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
    
}

export default GetPagePantallaService;