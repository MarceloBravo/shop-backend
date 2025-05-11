import { getDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const getDimensionesProductoService = async (id) => {
    try{
        return await getDimensionesProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el dimensiones del producto: " + error.message);
    }
}

export default getDimensionesProductoService;