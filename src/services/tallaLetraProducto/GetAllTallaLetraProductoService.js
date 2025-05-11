import { getAllTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';

const getAllTallaLetraProductoService = async () => {
    try{
        return await getAllTallaLetraProducto();
    }catch (error) {
        throw new Error("Error al obtener las tallas del producto: " + error.message);
    }
}

export default getAllTallaLetraProductoService;