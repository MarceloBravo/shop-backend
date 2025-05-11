import { getAllProducto } from '../../repositories/producto.repository.js';

const getAllProductoService = async () => {
    return await getAllProducto();
}

export default getAllProductoService;