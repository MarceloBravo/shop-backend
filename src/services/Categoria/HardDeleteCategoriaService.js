import CategoriaRepository from "../../repositories/CategoriaRepository.js";

class HardDeleteCategoriaService {
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    delete = async (id, transaction = null) => {
        return await this.repository.hardDelete(id, transaction);
    }
}

export default HardDeleteCategoriaService;