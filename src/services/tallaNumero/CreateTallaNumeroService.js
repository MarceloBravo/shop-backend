import TallaNumeroRepository from '../../repositories/tallaNumero.repository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear una nueva talla numérica
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tallas numéricas
 * @description Esta clase se encarga de crear una nueva talla numérica en la base de datos.
 * */
class CreateTallaNumeroService {
    constructor(repository = new TallaNumeroRepository()) {
        this.repository = repository;
    }

    /**
     * Crea una nueva talla numérica en la base de datos.
     * @param {Object} data - Datos de la talla numérica a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La talla numérica creada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateTallaNumeroService;