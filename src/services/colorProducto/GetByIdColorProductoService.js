import ColorProductoRepository from '../../repositories/ColorProductoRepository.js';


class GetByIdColorProductoService {
    constructor(repository = new ColorProductoRepository()) {
        this.repository = repository;
    }

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}   

export default GetByIdColorProductoService;