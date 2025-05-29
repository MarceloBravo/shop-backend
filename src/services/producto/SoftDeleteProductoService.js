import ProductoRepository from '../../repositories/ProductoRepository.js';

/**
 * @description: Servicio para eliminar un producto de forma lógica
 */
class SoftDeleteProductoService{

    /**
     * @description: Constructor de la clase
     * @param {ProductoRepository} repository - El repositorio de productos
     */
    constructor(repository = new ProductoRepository()){
        this.repository = repository;
    }

    /**
     * @description: Elimina un producto de forma lógica
     * @param {number} id - El id del producto a eliminar
     * @returns {Promise<number>} - El código de estado de la eliminación
     */
    execute = async (id) => {
        const record = await this.repository.softDelete(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    }
}

export default SoftDeleteProductoService;