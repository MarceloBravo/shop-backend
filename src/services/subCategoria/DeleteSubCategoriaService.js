import { deleteSubCategoria } from '../../repositories/subCategoria.repository.js';

const deleteSubCategoriaService = async ({id}) => {
    try{
        return await deleteSubCategoria(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteSubCategoriaService;