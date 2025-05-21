import SubCategoriaRepository from '../../repositories/SubCategoriaRepository.js';

/**
 * Servicio para eliminar físicamente una subcategoría.
 * @class
 * @constructor
 * @param {SubCategoriaRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de realizar el hard delete de una subcategoría.
 * */
class HardDeleteSubCategoriaService{
    constructor(repository = new SubCategoriaRepository()){
        this.repository = repository;
    }

    /**
     * Realiza el hard delete de una subcategoría.
     * @param {number} id - ID de la subcategoría a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Resultado de la operación.
     * */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteSubCategoriaService;
