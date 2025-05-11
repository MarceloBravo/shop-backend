import { softDeleteDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const softDeleteDimensionesProductoService = async (id) => {
    try {
        const record = await softDeleteDimensionesProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el dimensiones del producto: " + error.message);
    }
}

export default softDeleteDimensionesProductoService;