import CategoriaRepository from "../../repositories/CategoriaRepository.js";

class GetByIdCategoriaService{
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    execute = async (id, paranoid = true) => {
        return await this.repository.getById(id, paranoid);
    }   
}


export default GetByIdCategoriaService;