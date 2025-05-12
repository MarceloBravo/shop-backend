import { getPageAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';

const getPageAccionesPantallaService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageAccionesPantalla(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con registros: " + error.message);
    }
}

export default getPageAccionesPantallaService;