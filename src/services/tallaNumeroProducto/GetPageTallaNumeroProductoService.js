import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';

/**
 * Servicio para obtener una página de las relaciones talla numericas - productos.
 * @class GetPageTallaNumeroProductoService
 * @constructor
 * @param {TallaNumeroProductoRepository} repository - Repositorio de tallanumericaProducto.
 * @description Esta clase se encarga de obtener una página de las relaciones talla numericas -. productos de la base de datos.
 * */
class GetPageTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una página de las asociaciones entre productos y tallas de numerica
     * @param {boolean} [paranoid=true] - Si es true, solo retorna registros no eliminados (soft delete)
     * @returns {Promise<Array<Object>>} Lista de una página de las asociaciones encontradas
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }

}


export default GetPageTallaNumeroProductoService;