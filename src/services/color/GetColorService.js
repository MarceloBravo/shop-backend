import ColorRepository from '../../repositories/ColorRepository.js';

class GetColorService {
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    getById = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}   


export default GetColorService;