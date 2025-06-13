import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una talla letra
 * @class UpdateTallaLetraService
 */
class UpdateTallaLetraService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tallas letra
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una talla letra
     * @param {string|number} id - ID de la talla letra a actualizar
     * @param {Object} data - Datos de la talla letra a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Talla letra actualizada
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateTallaLetraService;