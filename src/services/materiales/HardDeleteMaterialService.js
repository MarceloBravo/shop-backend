import MaterialRepository from '../../repositories/MaterialRepository.js';

/**
 * Servicio para eliminar un material.
 * @class HardDeleteMaterialService
 * @constructor
 * @param {MaterialRepository} repository - Repositorio de materiales.
 * @description Esta clase se encarga de eliminar un material en la base de datos.
 * */
class HardDeleteMaterialService{
    constructor(repository = new MaterialRepository()){
        this.repository = repository;
    }

    /**
     * Elimina un material de la base de datos.
     * @param {number} id - ID del material a eliminar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Devuelve un objeto con el ID del material eliminado y el resultado de la operación.
     * */
    execute = async (id, transaction = null) => {
        return this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteMaterialService;