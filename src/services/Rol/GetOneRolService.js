import RolRepository from "../../repositories/RolRepository.js";

class GetOneRolService{

    constructor(repository = new RolRepository()){
        this.repository= repository;
    }

    getById = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetOneRolService;