import RolRepository from "../../repositories/RolRepository.js";
import validaDatos from './ValidaDatos.js.js';

class CreateRolService{
    
    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    execute = async (data) => {
        validaDatos(data);
        return await this.repository.create(data);
    }
}

export default CreateRolService;