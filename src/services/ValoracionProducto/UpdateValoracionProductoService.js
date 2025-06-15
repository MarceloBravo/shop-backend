import validaDatos from './ValidaDatos.js';

/**
 * Servicio para actualizar una valoración de producto
 * @class UpdateValoracionProductoService
 */
class UpdateValoracionProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de valoraciones de productos
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una valoración de producto
     * @param {string|number} id - ID de la valoración a actualizar
     * @param {Object} data - Datos de la valoración a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Valoración actualizada
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateValoracionProductoService;