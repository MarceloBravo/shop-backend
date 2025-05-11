import { createPesoProducto } from '../../repositories/pesoProducto.repository.js';
import validaDatos from './validaDatos.js';

const createPesoProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createPesoProducto(data, transaction);
}

export default createPesoProductoService;