import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';

/**
 * Servicio para obtener subcategorías paginadas.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de obtener subcategorías paginadas de la base de datos.
 * */
class GetPageSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene subcategorías paginadas.
     * @param {number} page - Número de página.
     * @param {number} [limit=10] - Límite de registros por página.
     * @param {boolean} [paranoid=true] - Si es true, incluye subcategorías eliminadas.
     * @returns {Promise<Object>} - Las subcategorías encontradas y metadata de paginación.
     * */
    execute = async (page, limit = 10, paranoid = true) => {
        const offset = (page - 1) * limit;
        return await this.repository.getPage(offset, limit, [['nombre', 'ASC']], paranoid);
    }
}

export default GetPageSubCategoriaService;