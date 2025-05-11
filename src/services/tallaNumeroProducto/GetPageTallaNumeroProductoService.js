import { getPageTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';

const getPageTallaNumeroProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageTallaNumeroProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con las tallas del producto: " + error.message);
    }
}

export default getPageTallaNumeroProductoService;