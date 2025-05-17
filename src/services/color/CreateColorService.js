import ColorRepository from '../../repositories/ColorRepository.js';
import validaDatos from './validaDatos.js';
class CreateColorService{

    constructor(repository = new ColorRepository()){
        this.repository = repository; 
    }   
    
    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }   

}


export default CreateColorService;