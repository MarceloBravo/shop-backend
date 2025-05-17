import GeneroRepository from '../../repositories/GeneroRepository.js';

class HardDeleteGeneroService {
    constructor(repository = new GeneroRepository()) {
        this.repository = repository;
    }

    execute = async (id, transaction = null) => {
        const result = await this.repository.hardDelete(id, transaction);
        return result;
    }
}   


export default HardDeleteGeneroService;