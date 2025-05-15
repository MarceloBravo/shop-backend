import RolRepository from "../../repositories/RolRepository.js";

class SoftDeleteRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    softDelete = async (id, transaction = null) => {
        const record = await this.repository.softDelete(id, transaction);
        return (record && record.deleted_at !== null ? 200: 404);
    }
}

export default SoftDeleteRolService;