/**
 * Servicio para realizar eliminación permanente de un producto
 * @class HardDeleteProductoService
 */
class HardDeleteProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la eliminación permanente de un producto
     * @param {string|number} id - ID del producto a eliminar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Resultado de la operación
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.getById(id, false);
        if (!existe) {
            throw new Error('Producto no encontrado');
        }
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteProductoService;