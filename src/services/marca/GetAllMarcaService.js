import MarcaRepository from '../../repositories/MarcaRepository.js';

/**
 * Clase para obtener todas las marcas.
 * @class GetAllMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 * @description Esta clase se encarga de obtener todas las marcas de la base de datos.
 */
class GetAllMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las marcas de la base de datos.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Array>} - Devuelve un array con todas las marcas.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllMarcaService;