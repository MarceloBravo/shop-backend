import { createMaterialProducto } from '../../repositories/materialProducto.repository.js';
import validaDatos from './validaDatos.js';

const createMaterialProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createMaterialProducto(data, transaction);
}

export default createMaterialProductoService;