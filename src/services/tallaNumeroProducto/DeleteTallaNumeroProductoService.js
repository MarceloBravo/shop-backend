import { deleteTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';

const deleteTallaNumeroProductoService = async (id) => {
    return await deleteTallaNumeroProducto(id);
}

export default deleteTallaNumeroProductoService;