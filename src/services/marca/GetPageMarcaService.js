import { getPageMarca } from '../../repositories/marca.repository.js';

const getPageMarcaService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageMarca(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPageMarcaService;