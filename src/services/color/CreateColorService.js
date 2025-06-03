import validaDatos from './validaDatos.js';

class CreateColorService {
    constructor(repository) {
        if (!repository) {
            throw new Error('El Repositorio es requerido');
        }
        this.repository = repository;
    }   
    
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }   
}

export default CreateColorService;