import { updateAtributo } from '../../repositories/atributo.repository.js';
import validaDatos from './validaDatos.js';

const updateAtributoService = async (id, data, transaction = null) => {
    validaDatos(data);
    const result = await updateAtributo(id, data, transaction);
    return result;
}

export default updateAtributoService;