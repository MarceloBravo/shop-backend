import { deleteProducto } from '../../repositories/producto.repository.js';

const deleteProductoService = async ({id}) => {
    try{
        return await deleteProducto(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteProductoService;