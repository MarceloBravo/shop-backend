import MaterialRepository from '../../repositories/MaterialRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para crear un nuevo material.
 * @class CreateMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de crear un nuevo material en la base de datos.
 * */
class CreateMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * Crea un nuevo material en la base de datos.
     * @param {Object} data - Datos del material a eliminiar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El material creado.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateMaterialService;