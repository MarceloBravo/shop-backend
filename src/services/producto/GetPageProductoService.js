import ProductoRepository from '../../repositories/ProductoRepository.js';

/**
 * @description: Servicio para obtener una página de productos
 */     
class GetPageProductoService{

    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Obtiene una página de productos
     * @param {number} pag - La página a obtener    
     * @param {number} limit - El número de registros por página
     * @returns {Promise<Producto[]>} - Los productos de la página
     */
    execute = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA, paranoid = true, filter ={}) => {
        const desde = (pag - 1) * limit;
        const result = await this.repository.getPage(desde, limit, paranoid, filter);
        return result;
    }

}

export default GetPageProductoService;