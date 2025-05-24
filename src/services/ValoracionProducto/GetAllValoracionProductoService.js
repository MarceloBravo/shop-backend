import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";

/**
 * Servicio para obtener todas las subcategorías.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de obtener todas las subcategorías de la base de datos.
 * */
class GetAllValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las valoraciones de los productos, registradas de la base de datos.
     * @param {boolean} [includeDeleted=false] - Si es false, incluye los registros eliminados.
     * @returns {Promise<Object>} - Todos los registros encontrados.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }

}


export default GetAllValoracionProductoService;