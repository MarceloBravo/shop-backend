import { getPageRol } from "../../repositories/rol.repository.js";

const getPageRolService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    const desde = (page - 1) * limit;
    const result = await getPageRol(desde, limit);    
    return result;
}

export default getPageRolService;