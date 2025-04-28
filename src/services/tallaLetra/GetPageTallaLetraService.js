import { getPageTallaLetra } from '../../repositories/tallaLetra.repository.js';

const getPageTallaLetraService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageTallaLetra(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los datos de la página: " + error.message);
    }
}

export default getPageTallaLetraService;