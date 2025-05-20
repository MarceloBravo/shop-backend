import PantallaRepository from '../../repositories/PantallaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para actualizar una pantalla existente.
 * @class UpdatePantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de pantallas de la tienda.
 * @description Esta clase se encarga de actualizar una pantalla existente en la base de datos.
 */
class UpdatePantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Actualiza una pantalla en la base de datos.
     * @param {number} id - ID de la pantalla a actualizar.
     * @param {Object} data - Datos de la pantalla a actualizar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La pantalla actualizado.
     * */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }

}

export default UpdatePantallaService;