import { softDeleteCategoria } from "../../repositories/categoria.repository.js";

const softDeleteCategoriaService = async (id) => {
    try {
        const record = await softDeleteCategoria(id);
        if(record && record.deleted_at !== null){
            return {status: 200, mensaje: 'El registro fue eliminado exitosamente'};
        }else{
            return {status: 404,  mensaje: 'Registro no encontrado.'};
        }
    } catch (error) {
        throw new Error("Error al eliminar la categoría: " + error.message);
    }
}

export default softDeleteCategoriaService;