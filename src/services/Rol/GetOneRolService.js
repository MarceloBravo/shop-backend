import RolRepository from "../../repositories/RolRepository.js";

class GetOneRolService{

    constructor(repository = new RolRepository()){
        this.repository= repository;
    }

    getOne = async (id) => {
        return await this.repository.getOne(id);
    }
}

export default GetOneRolService;