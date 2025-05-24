import ValoracionProductoRepository from "../../repositories/ValoracionProductoRepository.js";
import validaDatos from './ValidaDatos.js';

/**
 * Servicio para registrar una nueva valoración para un producto.
 * @class
 * @constructor
 * @param {ValoracionProductoRepository} repository - Repositorio de subcategorías.
 * @description Esta clase se encarga de registrar una nueva valoración para un producto, en la base de datos.
 * */
class CreateValoracionProductoService{
    constructor(repository = new ValoracionProductoRepository()){
        this.repository = repository;
    }

    /**
     * Registra una nueva valoración de un producto en la base de datos.
     * @param {Object} data - Datos de la valoración a registrar.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La valoración registrada.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}


export default CreateValoracionProductoService;