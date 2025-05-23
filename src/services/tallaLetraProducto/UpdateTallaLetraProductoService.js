import TallaLetraProductoRepository from '../../repositories/TallaLetraProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una relación tallaLetra-producto existente.
 * @class
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de actualizar una relación tallaLetra-producto existente en la base de datos.
 */
class UpdateTallaLetraProductoService{
    constructor(repository = new TallaLetraProductoRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una relación tallaLetra-producto en la base de datos.
     * @param {number} id - ID del menú a actualizar.
     * @param {Object} data - Datos del menú a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La ´relación tallaletra-producto actualizada.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(id);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateTallaLetraProductoService;