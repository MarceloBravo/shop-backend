import { getPagePesoProducto } from '../../repositories/pesoProducto.repository.js';

const getPagePesoProductoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPagePesoProducto(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con los pesos del producto: " + error.message);
    }
}

export default getPagePesoProductoService;