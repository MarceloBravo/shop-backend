import { softDeletePesoProducto } from '../../repositories/pesoProducto.repository.js';

const softDeletePesoProductoService = async (id) => {
    try {
        const record = await softDeletePesoProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el peso del producto: " + error.message);
    }
}

export default softDeletePesoProductoService;