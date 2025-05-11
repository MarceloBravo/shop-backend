import { softDeleteMaterialProducto } from '../../repositories/materialProducto.repository.js';

const softDeleteMaterialProductoService = async (id) => {
    try {
        const record = await softDeleteMaterialProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el material del producto: " + error.message);
    }
}

export default softDeleteMaterialProductoService;