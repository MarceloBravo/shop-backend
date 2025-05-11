import { getProducto } from '../../repositories/producto.repository.js';
import { getProductoQuery } from '../../repositories/producto.repository.js';

const getProductoService = async (id, obtenerPorQuery = false) => {
    try{
        return obtenerPorQuery ? await getProductoQuery(id) : await getProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getProductoService;