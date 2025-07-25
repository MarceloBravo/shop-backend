import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una subcategoría
 * @class UpdateSubCategoriaService
 */
class UpdateSubCategoriaService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de subcategorías
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Ejecuta la actualización de una subcategoría
     * @param {string|number} id - ID de la subcategoría a actualizar
     * @param {Object} data - Datos de la subcategoría a actualizar
     * @param {Object} [transaction=null] - Transacción de base de datos
     * @returns {Promise<Object>} Subcategoría actualizada
     */
    execute = async (id, data, transaction = null) => {
        await validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateSubCategoriaService;