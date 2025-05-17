import ColorProductoRepository from '../../repositories/ColorProductoRepository.js';

class GetAllColorProductoService{
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }       
}

export default GetAllColorProductoService;