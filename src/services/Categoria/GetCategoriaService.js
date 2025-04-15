import { getCategoria } from "../../repositories/categoria.repository";

const getCategoriaService = async (id) => {
    try {
        return await getCategoria(id);
    } catch (error) {
        throw new Error("Error al obtener la categoría: " + error.message);
    }
}

export default getCategoriaService;