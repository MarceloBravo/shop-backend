import { getSubCategoria } from '../../repositories/subCategoria.repository.js';

const getSubCategoriaService = async (id) => {
    try{
        return await getSubCategoria(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getSubCategoriaService;