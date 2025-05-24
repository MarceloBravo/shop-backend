import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";


/**
 * Servicio para eliminar físicamente una valoración de un producto.
 * @class
 * @constructor
 * @param {ValoracionProductoRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de realizar el hard delete de una valoración de un producto
 * */
class HardDeleteValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una valoración de un producto en la base de datos de forma definitiva.
     * @param {number} id - ID de la valoración a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación
     * */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }

}


export default HardDeleteValoracionProductoService;