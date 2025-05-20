import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';

/**
 * Clase para obtener todos los menús de la tienda.
 * @class GetAllMenuTiendaService
 * @constructor
 * @param {MenuTiendaRepository} repository - Repositorio de menús de la tienda.
* @description Esta clase se encarga de obtener todos los menús de la tienda de la base de datos.
 */
class GetAllMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todos los menús de la tienda de la base de datos.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús de la tienda no eliminados.
     * @returns {Promise<Array>} - Lista de menús de la tienda.
     */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}


export default GetAllMenuTiendaService;