import MenuRepository from '../../repositories/MenuRepository.js';

/**
 * Clase para obtener todos los menús.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
* @description Esta clase se encarga de obtener todos los menús de la base de datos.
 */
class GetAllMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todos los menús de la base de datos.
     * @params {boolean} [paranoid=true] - Si es true, se obtienen solo los menús no eliminados.
     * @returns {Promise<Array>} - Lista de menús.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMenuService;