import { getAllDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const getAllDimensionesProductoService = async () => {
    try{
        return await getAllDimensionesProducto();
    }catch (error) {
        throw new Error("Error al obtener los dimensioness del producto: " + error.message);
    }
}

export default getAllDimensionesProductoService;