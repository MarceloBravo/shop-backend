import { createDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';
import validaDatos from './validaDatos.js';

const createDimensionesProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createDimensionesProducto(data, transaction);
}

export default createDimensionesProductoService;