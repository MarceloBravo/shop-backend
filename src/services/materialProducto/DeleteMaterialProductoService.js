import { deleteMaterialProducto } from '../../repositories/materialProducto.repository.js';

const deleteMaterialProductoService = async (id) => {
    return await deleteMaterialProducto(id);
}

export default deleteMaterialProductoService;