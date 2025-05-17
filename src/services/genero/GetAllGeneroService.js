import GeneroRepository from '../../repositories/GeneroRepository.js';

class GetAllGeneroService {
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    /**
     * @param {boolean} [paranoid=true] - Si se deben incluir los registros eliminados
     * @returns {Promise<{data: *, count: number}>} - Promesa que se resuelve con los generos encontrados
     * */
    execute = async (paranoid = true) => {
        const {data, count} = await this.repository.getAll(paranoid);
        return {data, count};
    }
}   


export default GetAllGeneroService;