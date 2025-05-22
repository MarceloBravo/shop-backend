import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar un tipo de dimensión
 * @class UpdateTipoDimensionesService
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de eliminar permanentemente una talla numérica de la base de datos.
 * */
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