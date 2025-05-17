import GeneroRepository from '../../repositories/GeneroRepository.js';
import validaDatos from './validaDatos.js';

class CreateGeneroService {
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    /**
     * @param {Object} data - Datos del genero a crear
     * @param {boolean} [transaction=true] - Si se debe realizar la transacción
     * @returns {Promise<*>} - Promesa que se resuelve con el genero creado
     */
    execute = async (data, transaction = true) => {
        validaDatos(data);    
        return await this.repository.create(genero, transaction);
    }
}

export default CreateGeneroService;