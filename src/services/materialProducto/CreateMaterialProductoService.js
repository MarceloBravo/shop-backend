import MaterialProductoRepository from '../../repositories/MaterialProductoRepository.js';
import validaDatos from './validaDatos.js';


/**
 * Servicio para asignar un material a un producto.
 * @class CreateMaterialProductoService
 * @constructor
 * @param {MaterialProductoRepository} repository - Repositorio de materiales productos.
 * @description Esta clase se encarga de asignar un material a un producto.
 * */
class CreateMaterialProductoService{
    constructor(repository = new MaterialProductoRepository()){
        this.repository = repository;
    }

    /**
     * Asigna un material a un producto en la base de datos.
     * @param {Object} data - Datos con el ID del material y del producto asociar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - Objeto con la relación MaterialProducto creada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}

export default CreateMaterialProductoService;