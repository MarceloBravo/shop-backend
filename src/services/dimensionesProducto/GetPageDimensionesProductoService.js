import { getPageDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const getPageDimensionesProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageDimensionesProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con los dimensioness del producto: " + error.message);
    }
}

export default getPageDimensionesProductoService;