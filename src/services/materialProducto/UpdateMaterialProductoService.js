import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una relación material-producto
 * @class UpdateMaterialProductoService
 */
class UpdateMaterialProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de materiales-producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una relación material-producto
     * @param {string|number} id - ID de la relación material-producto a actualizar
     * @param {Object} data - Datos de la relación material-producto a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Relación material-producto actualizada
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateMaterialProductoService;