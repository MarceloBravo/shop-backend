import CategoriaRepository from "../../repositories/CategoriaRepository.js";

class GetAllCategoriaService{   
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    execute = async (paranoid = true) => {
        return await this.repository.getAll(paranoid);
    }
}


export default GetAllCategoriaService;