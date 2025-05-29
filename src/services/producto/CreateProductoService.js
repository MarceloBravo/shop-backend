import ProductoRepository from '../../repositories/ProductoRepository.js';
import validaDatos from './validaDatos.js';


/**
 * @description: Servicio para crear un nuevo producto
 */
class CreateProductoService{

    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }   

    /**
     * @description: Crea un nuevo producto
     * @param {Object} data - Los datos del producto a crear
     * @param {Transaction} transaction - La transacción a utilizar
     * @returns {Promise<Producto>} - El producto creado
     */
    execute = async (data, transaction = null) => {
        await validaDatos(data);
        const newRecord = await this.repository.create(data, transaction);
        return newRecord;
    }
}

export default CreateProductoService;