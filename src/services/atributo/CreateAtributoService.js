import { createAtributo } from '../../repositories/atributo.repository.js';
import validaDatos from './validaDatos.js';

const createAtributoService = async (data, transaccion = null) => {
    validaDatos(data);
    return await createAtributo(data, transaccion);
}

export default createAtributoService;