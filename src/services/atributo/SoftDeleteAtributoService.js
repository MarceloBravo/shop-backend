import AtributosRepository from '../../repositories/AtributosRepository.js';

class SoftDeleteAtributoService {
    
    constructor(repository = new AtributosRepository) {
        this.repository = repository;
    }

    softDelete = async (id, transaction = null) => {
        return await this.repository.softDelete(id, transaction);
    }
}   

export default SoftDeleteAtributoService;