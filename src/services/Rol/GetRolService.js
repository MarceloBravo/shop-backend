import RolRepository from "../../repositories/RolRepository.js";

class GetRolService{

    constructor(repository = new RolRepository()){
        this.repository= repository;
    }

    getRol = async (id) => {
        return await this.repository.getRol(id);
    }
}

export default GetRolService;