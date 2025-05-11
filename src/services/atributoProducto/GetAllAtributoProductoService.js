import { getAllAtributoProducto } from '../../repositories/atributoProducto.repository.js';

const getAllAtributoProductoService = async () => {
    try{
        return await getAllAtributoProducto();
    }catch (error) {
        throw new Error("Error al obtener los atributos del producto: " + error.message);
    }
}

export default getAllAtributoProductoService;