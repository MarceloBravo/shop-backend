import MenuRepository from '../../repositories/MenuRepository.js';

/**
 * Clase para obtener un menú a partir de su ID.
 * @class GetAllMenuService
 * @constructor
 * @param {MenuRepository} repository - Repositorio de menús.
 * @description Esta clase se encarga de obtener un menú a partir de su ID.
 */
class GetByIdMenuService{
    constructor(repository = new MenuRepository()){
        this.repository = repository;
    }   

    /**
     * Obtiene un menú por su ID.
     * @param {number} id - ID del menú a obtener.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús no eliminados.
     * @returns {Promise<Object>} - El menú encontrado.
     * */
    execute = async (id, paranoid = true) => {
        const menu = await this.repository.getById(id, paranoid);
        return menu;
    }   

}

export default GetByIdMenuService;