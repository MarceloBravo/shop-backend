import { softDeleteTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';

const softDeleteTallaLetraProductoService = async (id) => {
    try {
        const record = await softDeleteTallaLetraProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la talla del producto: " + error.message);
    }
}

export default softDeleteTallaLetraProductoService;