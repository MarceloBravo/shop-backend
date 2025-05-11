import { softDeleteTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';

const softDeleteTallaNumeroProductoService = async (id) => {
    try {
        const record = await softDeleteTallaNumeroProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la talla del producto: " + error.message);
    }
}

export default softDeleteTallaNumeroProductoService;