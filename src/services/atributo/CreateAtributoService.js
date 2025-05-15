import AtributosRepository from '../../repositories/AtributosRepository.js';
import validaDatos from './validaDatos.js';

class CreateAtributoService{
    
    constructor(repository = new AtributosRepository){
        this.repository = repository;
    }


    create = async (data, transaccion = null) => {
        validaDatos(data, this.repository);
        return await this.repository.create(data, transaccion);
    }
}

export default CreateAtributoService;