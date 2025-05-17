import ColorRepository from '../../repositories/ColorRepository.js';

class GetByIdColorService {
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}   


export default GetByIdColorService;