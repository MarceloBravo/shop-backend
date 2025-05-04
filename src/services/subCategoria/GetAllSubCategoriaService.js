import { getAllSubCategoria } from '../../repositories/subCategoria.repository.js';

const getAllSubCategoriaService = async () => {
    try{
        return await getAllSubCategoria();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllSubCategoriaService;