import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';
import validaDatos from './validaDatos.js';


/**
 * Servicio para actualizar una relación entre material-producto.
 * @class UpdateMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales productos.
 * @description Esta clase se encarga de actializar una relación material-producto.
 * */
class UpdateMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * @param {number} id - ID de la relación material-producto a actualizar.
     * @param {Object} data - ID del material y del producto a asociar.
     * @param {Object} [transaction=null] - Si se debe realizar la transacción.
     * @returns {Promise<*>} - Promesa que se resuelve con la relación material-producto actualizado.
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(id);
        const result = await updateMaterialProducto(id, data, transaction);
        return result;
    }
}

export default UpdateMaterialProductoService;