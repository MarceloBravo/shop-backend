import { isCheckInUse } from '../../repositories/atributoProducto.repository.js';

const isCheckInUseAtributoService = async (id, transaccion = null) => {
    return await isCheckInUse(id);
}

export default isCheckInUseAtributoService;