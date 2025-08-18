/**
 * Servicio para realizar eliminación lógica de un producto
 * @class SoftDeleteProductoService
 */
class SoftDeleteProductoService {
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
     * Ejecuta la eliminación lógica de un producto
     * @param {string|number} id - ID del producto a eliminar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<boolean>} true si el borrado fue exitoso, false en caso contrario
     */
    execute = async (id, transaction = null) => {
        const existe = await this.repository.findById(id);
        if (!existe) {
            const error = new Error('Producto no encontrado');
            error.code = 404;
            throw error;
        }
        return await this.repository.softDelete(id, transaction);
    }
}

export default SoftDeleteProductoService;