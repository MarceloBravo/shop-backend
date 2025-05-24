import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";

/**
 * Servicio para eliminar lógicamente una valoración de un producto.
 * @class
 * @constructor
 * @param {ValoracionProductoRepository} repository - Repositorio de valoración de un productos.
 * @description Esta clase se encarga de realizar el soft delete de una valoración de un producto.
 * */
class SoftDeleteValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina una valoración de un producto de forma suave (soft delete).
     * @param {number} id - ID del menú a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * @description Esta función elimina una valoración de un producto de la base de datos de forma suave (soft delete).
     */
    execute = async (id, transaction = null) => {
        const { result } = await this.repository.softDelete(id, transaction);
        return result;
    }

}


export default SoftDeleteValoracionProductoService;