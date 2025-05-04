import { updateProducto } from '../../repositories/producto.repository.js';
import validaDatos from './validaDatos.js';

const updateProductoService = async (id, data) => {
    try{
        await validaDatos(data);
        const result = await updateProducto(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el registro: " + error.message);
    }
}

export default updateProductoService;