import { getAllMaterialProducto } from '../../repositories/materialProducto.repository.js';

const getAllMaterialProductoService = async () => {
    try{
        return await getAllMaterialProducto();
    }catch (error) {
        throw new Error("Error al obtener los materials del producto: " + error.message);
    }
}

export default getAllMaterialProductoService;