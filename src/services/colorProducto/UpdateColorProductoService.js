import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un color de producto
 * @class UpdateColorProductoService
 */
class UpdateColorProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de colores de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un color de producto
     * @param {string|number} id - ID del color de producto a actualizar
     * @param {Object} data - Datos del color de producto a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Color de producto actualizado
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data, true, transaction);
        return await this.repository.update(id, data, transaction);
    }       
}

export default UpdateColorProductoService;