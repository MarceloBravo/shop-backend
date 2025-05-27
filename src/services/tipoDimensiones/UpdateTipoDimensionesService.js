import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import validaDatos from './validaDatos.js';

/**
     * Se encarga de marcar un regístro como eliminado.
     * @param {number} [id] - ID del regístro a eliminar con borrado suave 
     * @param {object} transaction - Objeto que puede contiene la transacción en la cual se borrará el regístro
     * @returns {Promise<Object>} - Resultado de la operación.
     */
class UpdateTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza un tipo de dimensiones existente
     * @param {number} id - ID del tipo de dimensiones a actualizar
     * @param {Object} data - Datos con los que actualizar el registro
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} El tipo de dimensiones actualizado
     */
    async execute(id, data, transaction = null) {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateTipoDimensionesService;