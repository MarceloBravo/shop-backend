import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una talla numérica
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de actualizar una talla numérica existente en la base de datos.
 * */
class UpdateTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza una talla numérica existente.
     * @param {number} id - ID de la talla numérica.
     * @param {Object} data - Datos a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la actualización.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateTallaNumeroService;