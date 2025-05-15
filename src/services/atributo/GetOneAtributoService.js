import AtributosRepository from '../../repositories/AtributosRepository.js';

class GetOneAtributoService{
    constructor(repository = new AtributosRepository){
        this.repository = repository;
    }

    getOne = async (id, paranoid = true) => {
        return await this.repository.getOne(id, paranoid);
    }
}   

export default GetOneAtributoService;