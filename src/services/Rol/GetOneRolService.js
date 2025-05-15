import RolRepository from "../../repositories/RolRepository.js";

class GetOneRolService{

    constructor(repository = new RolRepository()){
        this.repository= repository;
    }

    getOne = async (id, paranoid = true) => {
        return await this.repository.getOne(id, paranoid);
    }
}

export default GetOneRolService;