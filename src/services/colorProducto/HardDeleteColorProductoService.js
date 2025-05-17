import ColorProductoRepository from '../../repositories/ColorProductoRepository.js';

class HardDeleteColorProductoService{
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }       
}

export default HardDeleteColorProductoService;