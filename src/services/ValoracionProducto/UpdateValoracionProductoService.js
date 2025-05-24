import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import validaDatos from './ValidaDatos.js';

/**
 * Servicio para actualizar una valoración de un producto existente.
 * @class
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de actualizar una valoración de un producto existente en la base de datos.
 */
class UpdateValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una valoración de un producto en la base de datos.
     * @param {number} id - ID del menú a actualizar.
     * @param {Object} data - Datos del registro a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La valoración de un producto actualizada.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }

}

export default UpdateValoracionProductoService;