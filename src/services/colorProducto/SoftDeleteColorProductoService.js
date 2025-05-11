import { softDeleteColorProducto } from '../../repositories/colorProducto.repository.js';

const softDeleteColorProductoService = async (id) => {
    try {
        const record = await softDeleteColorProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el color del producto: " + error.message);
    }
}

export default softDeleteColorProductoService;