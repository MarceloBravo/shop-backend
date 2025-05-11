import { getPageValoracionProducto } from "../../repositories/valoracionProducto.repository.js";

const getPageValoracionProductoService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    const desde = (page - 1) * limit;
    const result = await getPageValoracionProducto(desde, limit);    
    return result;
}

export default getPageValoracionProductoService;