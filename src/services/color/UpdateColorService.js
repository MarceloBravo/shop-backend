import ColorRepository from '../../repositories/ColorRepository.js';
import validaDatos from './validaDatos.js';

class updateColorService{
    constructor(repository = new ColorRepository()){
        this.repository = repository; 
    }       
    
    execute = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }   
}

export default updateColorService;