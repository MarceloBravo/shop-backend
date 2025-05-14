import RolRepository from "../../repositories/RolRepository.js";

class SoftDeleteRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    softDeleteRol = async (id) => {
        const record = await this.repository.softDeleteRol(id);
        return (record && record.deleted_at !== null ? 200: 404);
    }
}

export default SoftDeleteRolService;