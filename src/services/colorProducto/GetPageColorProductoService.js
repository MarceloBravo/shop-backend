import { getPageColorProducto } from '../../repositories/colorProducto.repository.js';

const getPageColorProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageColorProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con los colors del producto: " + error.message);
    }
}

export default getPageColorProductoService;