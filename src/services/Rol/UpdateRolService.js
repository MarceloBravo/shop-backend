import validaDatos from './ValidaDatos.js.js';

/**
 * Servicio para actualizar un rol
 * @class UpdateRolService
 */
class UpdateRolService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de roles
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un rol
     * @param {string|number} id - ID del rol a actualizar
     * @param {Object} data - Datos del rol a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Rol actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateRolService;