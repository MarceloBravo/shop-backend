import MaterialRepository from '../../repositories/MaterialRepository.js';

/**
 * Servicio para obtener un material de la base de datos.
 * @class GetByIdMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de retornar un material de la base de datos a partir de su ID.
 * */
class GetByIdMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * Retorna un material de la base de datos a partir de su ID.
     * @param {number} id - ID del material a obtener.* 
     * @param {boolean} [paranoid=true] - Si es true, se obtienen solo las marcas no eliminadas.
     * @returns {Promise<Object>} - Promesa que se resuelve con el material encontrado.
     * */
    execute = async (id, paranoid = true) => {
        return this.repository.getById(id, paranoid);
    }
}

export default GetByIdMaterialService;