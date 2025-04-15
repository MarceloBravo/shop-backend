import { getPageCategoria } from "../../repositories/categoria.repository";

const getPageCategoriaService = async (page = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {    
    try {
        const desde = (page - 1) * limit;
        const { data } = await getPageCategoria(desde, limit);    
        return data;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPageCategoriaService;