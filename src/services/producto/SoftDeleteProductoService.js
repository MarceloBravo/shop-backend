import { softDeleteProducto } from '../../repositories/producto.repository.js';

const softDeleteProductoService = async (id) => {
    try {
        const record = await softDeleteProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteProductoService;