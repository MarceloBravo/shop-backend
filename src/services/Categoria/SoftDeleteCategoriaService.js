import CategoriaRepository from "../../repositories/CategoriaRepository.js";


class SoftDeleteCategoriaService{
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    execute = async (id, transaction = null) => {
        return await this.repository.softDelete(id, transaction);
    }   
}

export default SoftDeleteCategoriaService;