import { getAllTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';

const getAllTallaNumeroProductoService = async () => {
    try{
        return await getAllTallaNumeroProducto();
    }catch (error) {
        throw new Error("Error al obtener las tallas del producto: " + error.message);
    }
}

export default getAllTallaNumeroProductoService;