import { getMaterialProducto } from '../../repositories/materialProducto.repository.js';

const getMaterialProductoService = async (id) => {
    try{
        return await getMaterialProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el material del producto: " + error.message);
    }
}

export default getMaterialProductoService;