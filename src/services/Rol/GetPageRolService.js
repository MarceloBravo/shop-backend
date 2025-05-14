import RolRepository from "../../repositories/RolRepository.js";

class GetPageRolService{

    constructor(repository = new RolRepository()){
        this.repository = repository;
    }

    getPageRol = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
        const desde = (page - 1) * limit;
        const result = await this.repository.getPageRol(desde, limit);    
        return result;
    }
}   

export default GetPageRolService;