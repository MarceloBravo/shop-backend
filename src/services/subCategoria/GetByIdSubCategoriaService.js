import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';

/**
 * Servicio para obtener una subcategoría por su ID.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de obtener una subcategoría específica de la base de datos.
 * */
class GetByIdSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una subcategoría por su ID.
     * @param {number} id - ID de la subcategoría a buscar.
     * @param {boolean} [paranoid=true] - Si es true, incluye subcategorías eliminadas.
     * @returns {Promise<Object>} - La subcategoría encontrada.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdSubCategoriaService;