import { getPageSubCategoria } from '../../repositories/subCategoria.repository.js';

const getPageSubCategoriaService = async (pag = 1, limit = process.env.DEFAULT_REG_POR_PAGINA) => {
    try{
        const desde = (pag - 1) * limit;
        const result = await getPageSubCategoria(desde, limit);
        return result;
    } catch (error) {
        throw new Error("Error al obtener los datos de la página: " + error.message);
    }
}

export default getPageSubCategoriaService;