import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';

/**
 * Servicio para una relación matrerial-producto en base a su ID.
 * @class GetByIdMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales-productos.
 * @description Esta clase se encarga de obtener una relación material-producto desde la base de datos en base a su ID.
 * */
class GetByIdMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene la relación material-producto desde la base de datos.
     * @param {number} ID - ID de la relación a material-producto solicitada.
     * @param {boolean} paranoid - Determina si se deben considarera los regístros marcados con soft-delete.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Promesa con el resultado de la operación.
     * */
    execute = async (id, paranoid = true) => {
        return await getMaterialProducto(id, paranoid);
    }
}


export default GetByIdMaterialProductoService;