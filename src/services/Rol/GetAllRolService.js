import RolRepository from "../../repositories/RolRepository.js";

class GetAllRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}

export default GetAllRolService;