import { deleteColorProducto } from '../../repositories/colorProducto.repository.js';

const deleteColorProductoService = async ({id}) => {
    return await deleteColorProducto(id);
}

export default deleteColorProductoService;