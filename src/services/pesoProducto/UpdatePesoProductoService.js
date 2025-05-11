import { updatePesoProducto } from '../../repositories/pesoProducto.repository.js';
import validaDatos from './validaDatos.js';

const updatePesoProductoService = async (id, data, transaction = null) => {
    validaDatos(data);
    const result = await updatePesoProducto(id, data,transaction);
    return result;
}

export default updatePesoProductoService;