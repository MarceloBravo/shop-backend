import { updateTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateTallaNumeroProductoService = async (id, data,  transaction = null) => {
    try{
        validaDatos(id);
        const result = await updateTallaNumeroProducto(id, data, transaction);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la talla del producto: " + error.message);
    }
}

export default updateTallaNumeroProductoService;