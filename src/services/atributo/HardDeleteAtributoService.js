import AtributosRepository from '../../repositories/AtributosRepository.js';

class HardDeleteAtributoService{
    
    constructor(repository = new AtributosRepository){
        this.repository = repository;
    }

    hardDelete = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}


export default HardDeleteAtributoService;