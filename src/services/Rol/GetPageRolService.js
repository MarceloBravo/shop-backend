import RolRepository from "../../repositories/RolRepository.js";

class GetPageRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    getPage = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
        const desde = (page - 1) * limit;
        const result = await this.repository.getPage(desde, limit);    
        return result;
    }
}   

export default GetPageRolService;