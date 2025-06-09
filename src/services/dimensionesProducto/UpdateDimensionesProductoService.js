import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una dimensión de producto
 * @class UpdateDimensionesProductoService
 */
class UpdateDimensionesProductoService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de dimensiones de producto
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una dimensión de producto
     * @param {string|number} id - ID de la dimensión de producto a actualizar
     * @param {Object} data - Datos de la dimensión de producto a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Dimensión de producto actualizada
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateDimensionesProductoService;