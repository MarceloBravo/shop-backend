import AtributosRepository from '../../repositories/AtributosRepository.js';

class GetAllAtributoService{
    constructor(repository = new AtributosRepository){ 
        this.repository = repository;
      }
    
    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllAtributoService;