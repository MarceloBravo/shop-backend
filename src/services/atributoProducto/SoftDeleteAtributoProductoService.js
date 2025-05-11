import { softDeleteAtributoProducto } from '../../repositories/atributoProducto.repository.js';

const softDeleteAtributoProductoService = async (id) => {
    try {
        const record = await softDeleteAtributoProducto(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el atributo del producto: " + error.message);
    }
}

export default softDeleteAtributoProductoService;