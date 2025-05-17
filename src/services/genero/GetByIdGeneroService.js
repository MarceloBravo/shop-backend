import GeneroRepository from '../../repositories/GeneroRepository.js';

class GetByIdGeneroService{
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    /**
     * @param {number} id - ID del genero a obtener
     * @param {boolean} [paranoid=true] - Si se deben incluir los registros eliminados
     * @returns {Promise<*>} - Promesa que se resuelve con el genero encontrado
     */
    execute = async (id, paranoid = true) => {
        const data = await this.repository.getById(id, paranoid);
        return data;
    }   
}

export default GetByIdGeneroService;