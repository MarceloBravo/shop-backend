import { getPageMenu } from '../../repositories/menu.repository.js';

const getPageMenuService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageMenu(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPageMenuService;