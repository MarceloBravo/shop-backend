import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un producto
 * @class UpdateProductoService
 */
class UpdateProductoService {
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
     * Ejecuta la actualización de un producto
     * @param {string|number} id - ID del producto a actualizar
     * @param {Object} data - Datos del producto a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Producto actualizado
     * @throws {Error} Si la validación falla o hay un error en la actualización
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        const existe = await this.repository.getById(id);
        if (!existe) {
            throw new Error('Producto no encontrado');
        }
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateProductoService;