import RolRepository from "../../repositories/RolRepository.js";
import validaDatos from './ValidaDatos.js.js';


class UpdateRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }


    update = async (id, data) => {
        validaDatos(data);
        return await this.repository.update(id, data);
    }
}

export default UpdateRolService;