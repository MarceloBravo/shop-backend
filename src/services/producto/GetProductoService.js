import { getProducto } from '../../repositories/producto.repository.js';

const getProductoService = async (id) => {
    try{
        return await getProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el registro: " + error.message);
    }
}

export default getProductoService;