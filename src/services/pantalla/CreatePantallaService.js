import PantallaRepository from '../../repositories/PantallaRepository.js';
import validaDatos from './validaDatos.js';


/**
 * Servicio para crear una nueva pantalla.
 * @class CreatePantallaService
 * @constructor
 * @param {PantallaRepository} repository - Repositorio de pantallas.
 * @description Esta clase se encarga de crear un nueva pantalla en la base de datos.
 * */
class CreatePantallaService{
    constructor(repository = new PantallaRepository()){
        this.repository = repository;
    }

    /**
     * Crea un nueva pantalla en la base de datos.
     * @param {Object} data - Datos de la pantalla a crear.
     * @param {transaction} [transaction=null] - Transacción de la base de datos.
     * @returns {Promise<Object>} - La apantalla creado.
     * */
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
    
}

export default CreatePantallaService;