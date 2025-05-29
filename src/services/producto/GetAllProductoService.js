import ProductoRepository from '../../repositories/ProductoRepository.js';

/**
 * @description: Servicio para obtener todos los productos
 */
class GetAllProductoService{

    /**
     * @description: Constructor de la clase    
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Obtiene todos los productos        
     * @param {boolean} paranoid - Si se desea obtener los productos eliminados
     * @returns {Promise<Producto[]>} - Todos los productos
     */
    execute = async (paranoid = true, filter = {}) => {
        return await this.repository.getAll(paranoid, filter);
    }
}


export default GetAllProductoService;