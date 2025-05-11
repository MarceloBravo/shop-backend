import { updateColorProducto } from '../../repositories/colorProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateColorProductoService = async (id, data, transaction = null) => {
    validaDatos(data);
    const result = await updateColorProducto(id, data, transaction);
    return result;
}

export default updateColorProductoService;