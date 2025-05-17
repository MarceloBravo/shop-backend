import CategoriaRepository from "../../repositories/CategoriaRepository.js";
import validaDatos from "./validaDatos.js";

class CreateCategoriaService{
    
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    execute = async (data, transaction = null) => {
        validaDatos(data);
        return await this.repository.create(data, transaction);
    }
}       

export default CreateCategoriaService;