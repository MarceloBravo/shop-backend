import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un tipo de dimensión
 * @class UpdateTipoDimensionesService
 */
class UpdateTipoDimensionesService {
    /**
     * Crea una instancia del servicio
     * @param {Object} repository - Repositorio de tipos de dimensión
     * @throws {Error} Si el repositorio no es proporcionado
     */
    constructor(repository) {
        if (!repository) {
            throw new Error('El repositorio es requerido');
        }
        this.repository = repository;
    }

    /**
     * Actualiza un tipo de dimensiones existente
     * @param {number} id - ID del tipo de dimensiones a actualizar
     * @param {Object} data - Datos con los que actualizar el registro
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} El tipo de dimensiones actualizado
     */
    execute = async (id, value, transaction = null) => {
        validaDatos(value);
        const { data, created } = await this.repository.update(id, value, transaction);
        return { data, created };
    }
}

export default UpdateTipoDimensionesService;