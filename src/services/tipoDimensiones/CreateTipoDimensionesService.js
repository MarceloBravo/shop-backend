import TipoDimensionesRepository from '../../repositories/TipoDimensionesRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo tipo de dimensión (tipo de medida)
 * @class
 * @constructor
 * @param {TallaNumeroRepository} repository - Repositorio de tipo de dimensión (tipo de medida)
 * @description Esta clase se encarga de crear un nuev tipo de dimensión (tipo de medida) en la base de datos.
 * */
class CreateTipoDimensionesService {
    constructor(repository = new TipoDimensionesRepository()) {
        this.repository = repository;
    }

    /**
     * Crea un nuevo tipo de dimensiones
     * @param {Object} data - Datos del tipo de dimensiones
     * @param {string} data.nombre_corto - Nombre corto del tipo de dimensiones
     * @param {Object} [transaction] - Transacción de Sequelize
     * @returns {Promise<Object>} El tipo de dimensiones creado
     */
    async execute(data, transaction = null) {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateTipoDimensionesService;