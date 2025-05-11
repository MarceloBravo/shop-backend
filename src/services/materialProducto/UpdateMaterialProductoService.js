import { updateMaterialProducto } from '../../repositories/materialProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateMaterialProductoService = async (id, data, transaction = null) => {
    try{
        validaDatos(id);
        const result = await updateMaterialProducto(id, data, transaction);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el material del producto: " + error.message);
    }
}

export default updateMaterialProductoService;