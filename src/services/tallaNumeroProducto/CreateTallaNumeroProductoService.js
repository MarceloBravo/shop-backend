import { createTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';
import validaDatos from './validaDatos.js';

const createTallaNumeroProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createTallaNumeroProducto(data, transaction);
}

export default createTallaNumeroProductoService;