import RolRepository from "../../repositories/RolRepository.js"; 

class HardDeleteRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    hardDelete = async ({id}) => {
        return await this.repository.hardDelete(id);
    }
}

export default HardDeleteRolService;