import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";

/**
 * Servicio para obtener una valoración de un producto por su ID.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de valoración de un productos.
 * @description Esta clase se encarga de obtener una valoración de un producto específica de la base de datos.
 * */
class GetByIdValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene una valoración de un producto por su ID.
     * @param {number} id - ID de la valoración de un producto a buscar.
     * @param {boolean} [paranoid=true] - Si es false, incluye valoración de un productos eliminadas.
     * @returns {Promise<Object>} - La valoración de un producto encontrada.
     * */
    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}


export default GetByIdValoracionProductoService;