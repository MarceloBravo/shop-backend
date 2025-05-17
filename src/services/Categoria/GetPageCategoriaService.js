import CategoriaRepository from "../../repositories/CategoriaRepository.js";

class getPageCategoriaService{
    constructor(repository = new CategoriaRepository()) {
        this.repository = repository;
    }

    execute = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
        const desde = (page - 1) * limit;
        return await this.repository.getPage(desde, limit);
    }   
}

export default getPageCategoriaService;