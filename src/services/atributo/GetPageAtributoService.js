import { getPageAtributo } from '../../repositories/atributo.repository.js';

const getPageAtributoService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageAtributo(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener la página con registros: " + error.message);
    }
}

export default getPageAtributoService;