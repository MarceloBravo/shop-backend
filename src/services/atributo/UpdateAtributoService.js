import AtributosRepository from '../../repositories/AtributosRepository.js';
import validaDatos from './validaDatos.js';

class UpdateAtributoService{

    constructor(repository = new AtributosRepository){
        this.repository = repository;
    }

    update = async (id, data, transaction = null) => {
        validaDatos(data, this.repository);
        const result = await this.repository.update(id, data, transaction);
        return result;
    }
}

export default UpdateAtributoService;