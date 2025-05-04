import { softDeleteSubCategoria } from '../../repositories/subCategoria.repository.js';

const softDeleteSubCategoriaService = async (id) => {
    try {
        const record = await softDeleteSubCategoria(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteSubCategoriaService;