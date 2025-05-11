import { getPageMaterialProducto } from '../../repositories/materialProducto.repository.js';

const getPageMaterialProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageMaterialProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con los materials del producto: " + error.message);
    }
}

export default getPageMaterialProductoService;