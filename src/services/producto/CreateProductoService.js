import { createProducto } from '../../repositories/producto.repository.js';
import validaDatos from './validaDatos.js';

const createProductoService = async (data, transaction = null) => {
    await validaDatos(data);
    return await createProducto(data, transaction);
}

export default createProductoService;