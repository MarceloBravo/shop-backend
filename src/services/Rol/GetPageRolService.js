import { getPageRol } from "../../repositories/rol.repository.js";

const getPageRolService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    try {
        const desde = (page - 1) * limit;
        const result = await getPageRol(desde, limit);    
        return result;
    } catch (error) {
        throw new Error("Error al obtener los regístros de la página: " + error.message);
    }
}

export default getPageRolService;