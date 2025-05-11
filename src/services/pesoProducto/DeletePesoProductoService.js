import { deletePesoProducto } from '../../repositories/pesoProducto.repository.js';

const deletePesoProductoService = async (id) => {
    return await deletePesoProducto(id);
}

export default deletePesoProductoService;