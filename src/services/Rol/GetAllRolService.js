import RolRepository from "../../repositories/RolRepository.js";

class GetAllRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    getAllRol = async () => {
        return await this.repository.getAllRol();
    }
}

export default GetAllRolService;