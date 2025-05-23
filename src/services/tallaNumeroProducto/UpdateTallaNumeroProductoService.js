import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una relación talla numerica-producto existente.
 * @class
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de actualizar una relación talla numerica-producto existente en la base de datos.
 */
class UpdateTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una relación talla numerica-producto en la base de datos.
     * @param {number} id - ID del menú a actualizar.
     * @param {Object} data - Datos del menú a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La ´relación talla numerica-producto actualizada.
     * */
    execute = async (id, data,  transaction = null) => {
        validaDatos(id);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateTallaNumeroProductoService;