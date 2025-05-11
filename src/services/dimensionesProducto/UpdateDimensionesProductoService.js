import { updateDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateDimensionesProductoService = async (id, data, transaction = null) => {
    validaDatos(data);
    const result = await updateDimensionesProducto(id, data,transaction);
    return result;
}

export default updateDimensionesProductoService;