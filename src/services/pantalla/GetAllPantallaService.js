import PantallaRepository from '../../repositories/PantallaRepository.js';

/**
 * Clase para obtener todas las pantallas.
 * @class GetAllPantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de menús de la tienda.
* @description Esta clase se encarga de obtener todas las pantallas de la base de datos.
 */
class GetAllPantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las pantallas de la base de datos.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las pantallas no eliminadas.
     * @returns {Promise<Array>} - Lista de pantallas de la tienda.
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllPantallaService;