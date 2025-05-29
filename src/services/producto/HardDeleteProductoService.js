import ProductoRepository from '../../repositories/ProductoRepository.js';

/**
 * @description: Servicio para eliminar un producto de forma permanente
 */
class HardDeleteProductoService{
    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Elimina un producto de forma permanente
     * @param {number} id - El id del producto a eliminar
     * @param {Transaction} transaction - La transacción a utilizar
     * @returns {Promise<{id: number, result: number}>} - El id del producto y el resultado de la eliminación
     */ 
    execute = async (id, transaction) => {
        return await this.repository.hardDelete(id, transaction );
    }
}

export default HardDeleteProductoService;