import ProductoRepository from '../../repositories/ProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * @description: Servicio para actualizar un producto
 */
class UpdateProductoService{

    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Actualiza un producto
     * @param {number} id - El id del producto a actualizar
     * @param {Object} data - Los datos del producto a actualizar
     * @param {Transaction} transaction - La transacción a utilizar
     * @returns {Promise<Producto>} - El producto actualizado
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
            const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateProductoService;