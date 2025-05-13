import { getPageRolPermisos } from "../../repositories/rolPermisos.repository.js";

const getPageRolPermisosService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    const desde = (page - 1) * limit;
    const result = await getPageRolPermisos(desde, limit);    
    return result;
}

export default getPageRolPermisosService;