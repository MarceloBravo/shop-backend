import { softDeleteCategoria } from "../../repositories/categoria.repository.js";

const softDeleteCategoriaService = async (id) => {
    try {
        const record = await softDeleteCategoria(id);
        return (record && record.deleted_at !== null ? 200: 404);
    } catch (error) {
        throw new Error("Error al eliminar la categoría: " + error.message);
    }
}

export default softDeleteCategoriaService;