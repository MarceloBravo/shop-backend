import RolRepository from "../../repositories/RolRepository.js";

class GetAllRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    getAll = async () => {
        return await this.repository.getAll();
    }
}

export default GetAllRolService;