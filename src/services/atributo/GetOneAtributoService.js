import AtributosRepository from '../../repositories/AtributosRepository.js';

class GetOneAtributoService{
    constructor(repository = new AtributosRepository){
        this.repository = repository;
    }

    getById = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}   

export default GetOneAtributoService;