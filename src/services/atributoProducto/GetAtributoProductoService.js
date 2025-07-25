import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';

class GetAtributoProductoService{
    constructor(repository = new AtributoProductoRepository()){
        this.repository = repository;
    }   

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetAtributoProductoService;