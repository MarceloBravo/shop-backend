import { getAllPesoProducto } from '../../repositories/pesoProducto.repository.js';

const getAllPesoProductoService = async () => {
    try{
        return await getAllPesoProducto();
    }catch (error) {
        throw new Error("Error al obtener los pesos del producto: " + error.message);
    }
}

export default getAllPesoProductoService;