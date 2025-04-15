import { updateCategoria } from "../../repositories/categoria.repository";

const updateCategoriaService = async ({id, nombre}) => {
    try {
            const { nombre, descripcion } = data;
            const [ categoria, created ] = await updateCategoria({where:{id}, defaults: data});
            categoria.nombre = nombre;
            categoria.descripcion = descripcion;
            categoria.deleted_at = null;
        
            await categoria.save();
        
            return [categoria, created];
    } catch (error) {
        throw new Error("Error al actualizar la categoría: " + error.message);
    }
}

export default updateCategoriaService;