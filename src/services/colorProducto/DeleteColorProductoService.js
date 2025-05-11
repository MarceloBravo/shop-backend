import { deleteColorProducto } from '../../repositories/colorProducto.repository.js';

const deleteColorProductoService = async ({id}) => {
    try{
        return await deleteColorProducto(id);
    } catch (error) {
        throw new Error("Error al eliminar el color del Producto: " + error.message);
    }
}

export default deleteColorProductoService;