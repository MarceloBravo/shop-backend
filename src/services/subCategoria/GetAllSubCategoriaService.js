import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';

/**
 * Servicio para obtener todas las subcategorías.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de obtener todas las subcategorías de la base de datos.
 * */
class GetAllSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las subcategorías de la base de datos.
     * @param {boolean} [includeDeleted=false] - Si es true, incluye las subcategorías eliminadas.
     * @returns {Promise<Object>} - Las subcategorías encontradas.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll([['nombre', 'ASC']], paranoid);
    }
}

export default GetAllSubCategoriaService;