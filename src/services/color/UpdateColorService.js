import validaDatos from './validaDatos.js';

class UpdateColorService {
    constructor(repository) {
        if (!repository) {
            throw new Error('Repository is required');
        }
        this.repository = repository;
    }       
    
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }   
}

export default UpdateColorService;