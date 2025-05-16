import CategoriaRepository from "../../repositories/CategoriaRepository.js";
import validaDatos from "./validaDatos.js";
class UpdateCategoriaService{
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    update = async (id, data, transaction = null) => {
        validaDatos(data);
        return await this.repository.update(id, data, transaction);
    }   
}


export default UpdateCategoriaService;