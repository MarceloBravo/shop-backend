import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";

/**
 * Servicio para obtener valoraciones de productos paginadas.
 * @class
 * @constructor
 * @param {ValoracionProductoRepository} repository - Repositorio de valoraciones de productos.
 * @description Esta clase se encarga de obtener valoraciones de productos paginadas de la base de datos.
 * */
class GetPageValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene valoraciones de productos paginadas.
     * @param {number} page - Número de página.
     * @param {number} [limit=10] - Límite de registros por página.
     * @param {boolean} [paranoid=true] - Si es true, incluye valoraciones de productos eliminadas.
     * @returns {Promise<Object>} - Las valoraciones de productos encontradas y metadata de paginación.
     * */
    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {    
        const desde = (page - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);    
        return result;
    }

}

export default GetPageValoracionProductoService;