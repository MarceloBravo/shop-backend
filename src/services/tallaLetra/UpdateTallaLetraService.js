import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una talla letra
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de actualizar una talla letra existente en la base de datos.
 * */
class UpdateTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Actualiza una talla letra existente.
     * @param {number} id - ID de la talla letra.
     * @param {Object} data - Datos a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la actualización.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }
}

export default UpdateTallaLetraService;