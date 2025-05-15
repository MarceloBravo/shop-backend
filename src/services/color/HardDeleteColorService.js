import ColorRepository from '../../repositories/ColorRepository.js';

class HardDeleteColorService {
    constructor(repository = new ColorRepository()) {
        this.repository = repository;
    }

    hardDelete = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}   

export default HardDeleteColorService;