import { deleteDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const deleteDimensionesProductoService = async ({id}) => {
    try{
        return await deleteDimensionesProducto(id);
    } catch (error) {
        throw new Error("Error al eliminar el dimensiones del Producto: " + error.message);
    }
}

export default deleteDimensionesProductoService;