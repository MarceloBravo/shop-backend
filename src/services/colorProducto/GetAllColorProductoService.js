import { getAllColorProducto } from '../../repositories/colorProducto.repository.js';

const getAllColorProductoService = async () => {
    try{
        return await getAllColorProducto();
    }catch (error) {
        throw new Error("Error al obtener los colors del producto: " + error.message);
    }
}

export default getAllColorProductoService;