import { getPageColor } from '../../repositories/color.repository.js';

const getPageColorService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const { data } = await getPageColor(desde, limit);

        return data;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPageColorService;