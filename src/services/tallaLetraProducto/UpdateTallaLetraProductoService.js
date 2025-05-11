import { updateTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateTallaLetraProductoService = async (id, data, transaction = null) => {
    try{
        validaDatos(id);
        const result = await updateTallaLetraProducto(id, data, transaction);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la talla del producto: " + error.message);
    }
}

export default updateTallaLetraProductoService;