import ColorRepository from '../../repositories/ColorRepository.js';

class GetAllColorService {  
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    getAll = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}       

export default GetAllColorService;