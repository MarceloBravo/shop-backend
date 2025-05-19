import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';

/**
 * Servicio para eliminar la relación entre un material y un producto.
 * @class HardDeleteMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales productos.
 * @description Esta clase se encarga desasignar un material de un producto.
 * */
class HardDeleteMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * Elimina la relación entre un material y un producto, en la base de datos.
     * @param {Object} data - ID del regístro que almacena la relación material-producto.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Promesa con el resultado de la operación.
     * */
    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
    
} 

export default HardDeleteMaterialProductoService;