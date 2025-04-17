import { updateCategoria } from "../../repositories/categoria.repository.js";

const updateCategoriaService = async (id, data) => {
    try {
            const result = await updateCategoria({where:{id}, defaults: data});
            return result;
    } catch (error) {
        throw new Error("Error al actualizar la categoría: " + error.message);
    }
}

export default updateCategoriaService;