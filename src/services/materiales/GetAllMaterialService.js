import MaterialRepository from '../../repositories/MaterialRepository.js';

/**
 * Servicio para obtener todos los materiales de la base de datos.
 * @class GetAllMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de retornar todos los materiales de la base de datos.
 * */
class GetAllMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * Retorna todos los materiales de la base de datos.
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Object>} - Devuelve un array con todas los materiales.
     * */
    execute = async (paranoid = true) => {
        return this.repository.getAll(paranoid);
    }
}

export default GetAllMaterialService;