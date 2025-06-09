import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un menú
 * @class UpdateMenuService
 */
class UpdateMenuService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de menús
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de un menú
     * @param {string|number} id - ID del menú a actualizar
     * @param {Object} data - Datos del menú a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Menú actualizado
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateMenuService;