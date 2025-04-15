import { deleteCategoria } from "../../repositories/categoria.repository"; 

const deleteCategoriaService = async (id) => {
    try {
        return await deleteCategoria(id);
    } catch (error) {
        throw new Error("Error al eliminar la categoría: " + error.message);
    }
}

export default deleteCategoriaService;