import { getPageAtributoProducto } from '../../repositories/atributoProducto.repository.js';

const getPageAtributoProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageAtributoProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con los atributos del producto: " + error.message);
    }
}

export default getPageAtributoProductoService;