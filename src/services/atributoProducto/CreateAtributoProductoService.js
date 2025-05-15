import AtributoProductoRepository from '../../repositories/AtributoProductoRepository.js';
import validaDatos from './validaDatos.js';

class CreateAtributoProductoService {
    constructor(repository = new AtributoProductoRepository()) {
        this.repository = repository;
    }

    async create(data, transaction = null) {
        validaDatos(data);
        const newRecord = await this.repository.create(data, transaction);
        return newRecord;
    }
}   


export default CreateAtributoProductoService;