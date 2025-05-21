import TallaLetraRepository from '../../repositories/TallaLetraRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva talla letra
 * @class
 * @constructor
 * @param {TallaLetraRepository} repository - Repositorio de tallas letra
 * @description Esta clase se encarga de crear una nueva talla letra en la base de datos.
 * */
class CreateTallaLetraService {
    constructor(repository = new TallaLetraRepository()) {
        this.repository = repository;
    }

    /**
     * Crea una nueva talla letra en la base de datos.
     * @param {Object} data - Datos de la talla letra a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La talla letra creada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateTallaLetraService;