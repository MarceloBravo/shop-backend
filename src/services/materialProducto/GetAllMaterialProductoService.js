import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';

/**
 * Servicio para obtener todas las relaciones matrerial-producto desde la base de datos.
 * @class GetAllMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales-productos.
 * @description Esta clase se encarga de obtener todas las relaciones material-producto.
 * */
class GetAllMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * Obtiene todas las relaciones material-producto desde la base de datos.
     * @param {boolean} paranoid - Determina si se deben considarera los regístros marcados con soft-delete.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Promesa con las relaciones Materiales-productos.
     * */
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}


export default GetAllMaterialProductoService;