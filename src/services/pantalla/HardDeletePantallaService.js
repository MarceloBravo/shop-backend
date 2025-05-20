import PantallaRepository from '../../repositories/PantallaRepository.js';

/**
 * Servicio encargado de eliminar una apantalla en la base d datos .
 * @class HardDeletePantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de menús de la tienda
 * @description Esta clase se encarga de eliminar una apantalla en la base de datos.
 */
class HardDeletePantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una apantalla de forma permanente.
     * @param {number} id - ID del menú de la tienda a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una apantalla de la base de datos de forma permanente.
     */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeletePantallaService;