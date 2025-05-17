import GeneroRepository from '../../repositories/GeneroRepository.js';
import validaDatos from './validaDatos.js';

class UpdateGeneroService{
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }  

    /**
     * @param {number} id - ID del genero a actualizar
     * @param {Object} data - Datos del genero a actualizar
     * @param {boolean} [transaction=null] - Si se debe realizar la transacción
     * @returns {Promise<*>} - Promesa que se resuelve con el genero actualizado
     */
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        const record = await this.repository.update(id, data, transaction);
        return record;
    } 
}

export default UpdateGeneroService;