import RolRepository from "../../repositories/RolRepository.js";

class GetByIdRolService{

    constructor(repository = new RolRepository()){
        this.repository= repository;
    }

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }
}

export default GetByIdRolService;