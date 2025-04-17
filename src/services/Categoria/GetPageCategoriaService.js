import { getPageCategoria } from "../../repositories/categoria.repository.js";

const getPageCategoriaService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    try {
        const desde = (page - 1) * limit;
        const result = await getPageCategoria(desde, limit);    
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPageCategoriaService;