import RolRepository from "../../repositories/RolRepository.js"; 

class DeleteRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    deleteRol = async ({id}) => {
        return await this.repository.deleteRol(id);
    }
}

export default DeleteRolService;