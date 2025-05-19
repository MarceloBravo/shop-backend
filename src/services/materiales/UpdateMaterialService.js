import MaterialRepository from '../../repositories/MaterialRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Clase para actualizar un material de la base de datos.
 * @class UpdateMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de material un material de la base de datos.
 */
class UpdateMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * @param {number} id - ID del material a actualizar.
     * @param {Object} data - Datos del material a actualizar.
     * @param {Object} [transaction=null] - Si se debe realizar la transacción.
     * @returns {Promise<*>} - Promesa que se resuelve con el material actualizado.
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateMaterialService;