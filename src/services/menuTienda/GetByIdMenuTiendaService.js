import MenuTiendaRepository from '../../repositories/MenuTiendaRepository.js';

/**
 * Clase para obtener un menú de la tienda a partir de su ID.
 * @class GetByIdMenuTiendaService
 * @constructor
 * @param {MenuTiendaRepository} repository - Repositorio de menús de la tienda.
 * @description Esta clase se encarga de obtener un menú de la tienda a partir de su ID.
 */
class GetByIdMenuTiendaService{
    constructor(repository = new MenuTiendaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene un menú de la tienda por su ID.
     * @param {number} id - ID del menú a obtener.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo los menús de la tienda no eliminados.
     * @returns {Promise<Object>} - El menú de la tienda encontrado.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}


export default GetByIdMenuTiendaService;