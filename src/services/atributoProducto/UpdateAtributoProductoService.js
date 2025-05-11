import { updateAtributoProducto } from '../../repositories/atributoProducto.repository.js';
import validaDatos from './validaDatos.js';

const updateAtributoProductoService = async (data, transaction = null) => {
    validaDatos(data);
    return await updateAtributoProducto(data.id, data, transaction);
}

export default updateAtributoProductoService;