import MaterialRepository from '../../repositories/MaterialRepository.js';

/**
 * Servicio para obtener una página de registros de materiales de la base de datos.
 * @class GetPageMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de retornar una página de regístros de materiales de la base de datos.
 * */
class GetPageMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository; 
    }
    
    /**
     * Retorna una página de materiales de la base de datos.
     * @param {number} pag - Número de página a obtener.
     * @param {number} limit - Número máximo de marcas por página.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Object>} - Devuelve un array con todas los materiales correspondientes a la página solicitada.
     * */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid);
        return result;
    }
}

export default GetPageMaterialService;