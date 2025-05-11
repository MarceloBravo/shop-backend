import { createAtributoProducto } from '../../repositories/atributoProducto.repository.js';
import validaDatos from './validaDatos.js';

const createAtributoProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await createAtributoProducto(data, transaction);
}

export default createAtributoProductoService;