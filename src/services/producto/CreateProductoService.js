import { createProducto } from '../../repositories/producto.repository.js';
import validaDatos from './validaDatos.js';

const createProductoService = async (data) => {
    await validaDatos(data);
    return await createProducto(data);
}

export default createProductoService;