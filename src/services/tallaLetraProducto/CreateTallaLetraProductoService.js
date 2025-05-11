import { createTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';
import validaDatos from './validaDatos.js';

const createTallaLetraProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createTallaLetraProducto(data, transaction);
}

export default createTallaLetraProductoService;