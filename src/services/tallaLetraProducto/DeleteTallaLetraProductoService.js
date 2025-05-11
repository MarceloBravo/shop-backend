import { deleteTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';

const deleteTallaLetraProductoService = async (id, transaction = null) => {
    return await deleteTallaLetraProducto(id, transaction);
}

export default deleteTallaLetraProductoService;