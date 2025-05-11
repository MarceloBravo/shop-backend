import { createColorProducto } from '../../repositories/colorProducto.repository.js';
import validaDatos from './validaDatos.js';

const createColorProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createColorProducto(data, transaction);
}

export default createColorProductoService;