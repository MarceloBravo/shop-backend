import ProductoRepository from '../../repositories/ProductoRepository.js';


/**
 * @description: Servicio para obtener un producto por su id
 */
class GetByProductoService{ 

    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Obtiene un producto por su id
     * @param {number} id - El id del producto a obtener
     * @param {boolean} obtenerPorQuery - Si se desea obtener el producto por query
     * @returns {Promise<Producto>} - El producto obtenido
     */
    execute = async (id, obtenerPorQuery = false, paranoid = true) => {
        return obtenerPorQuery ? await this.repository.query(id, paranoid) : await this.repository.getById(id, paranoid);
    }
}

export default GetByProductoService;