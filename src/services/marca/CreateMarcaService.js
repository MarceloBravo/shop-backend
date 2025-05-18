import MarcaRepository from '../../repositories/MarcaRepository.js';
import validaDatos from './validaDatos.js';

/**
 * Clase para crear una nueva marca.
 * @class CreateMarcaService
 * @constructor
 * @param {MarcaRepository} repository - Repositorio de marcas.
 */
class CreateMarcaService{
    constructor(repository = new MarcaRepository()){
        this.repository = repository;
    }

    /**
     * Crea una nueva marca en la base de datos.
     * @param {Object} values - Objeto que contiene los datos de la marca a crear.
     * @params {Transaction} transaction - Transacción de Sequelize para manejar la creación de la marca.
     * @returns {Promise<Object>} - Devuelve la marca creada.
     * */
    execute = async (values, transaction = null) => {
        validaDatos(values);
        return await this.repository.create(values, transaction);
    }   
}

export default CreateMarcaService;