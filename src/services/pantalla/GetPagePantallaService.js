import { getPagePantalla } from '../../repositories/pantalla.repository.js';

const getPagePantallaService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPagePantalla(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página: " + error.message);
    }
}

export default getPagePantallaService;