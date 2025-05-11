import { deleteAtributoProducto } from '../../repositories/atributoProducto.repository.js';

const deleteAtributoProductoService = async (id, transaction = null) => {
    return await deleteAtributoProducto(id, transaction);
}

export default deleteAtributoProductoService;