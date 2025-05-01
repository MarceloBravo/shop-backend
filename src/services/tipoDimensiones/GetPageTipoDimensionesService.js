import { getPageTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const getPageTipoDimensionesService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageTipoDimensiones(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los datos de la página: " + error.message);
    }
}

export default getPageTipoDimensionesService;