import { getAllProducto } from '../../repositories/producto.repository.js';

const getAllProductoService = async () => {
    try{
        return await getAllProducto();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllProductoService;