import { getAllCategoria } from "../../repositories/categoria.repository.js";

const getAllCategoriaService = async () => {
    try {
        return await getAllCategoria();
    } catch (error) {
        throw new Error("Error al obtener las categorías: " + error.message);
    }
}

export default getAllCategoriaService;