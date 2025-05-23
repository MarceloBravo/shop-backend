import TallaNumeroProductoRepository from '../../repositories/TallaNumeroProductoRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Servicio para asociar una talla numerica con un producto.
 * @class CreateTallaNumeroProductoService
 * @constructor
 * @param {TallaNumeroProductoRepository} repository - Repositorio de tallaLetraProducto.
 * @description Esta clase se encarga de asociar una talla numerica con un producto en la base de datos.
 * */
class CreateTallaNumeroProductoService{
    constructor(repository = new TallaNumeroProductoRepository()){
        this.repository = repository;
    }

    /**
     * Asocia una tallaLetra con un producto.
     * @param {Object} data - Datos de la tallaLetra y el producto a asociar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - El regístro con la asociación talla numerica - producto recién creada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}


export default CreateTallaNumeroProductoService;