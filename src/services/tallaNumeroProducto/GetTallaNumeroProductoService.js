import { getTallaNumeroProducto } from '../../repositories/tallaNumeroProducto.repository.js';

const getTallaNumeroProductoService = async (id) => {
    try{
        return await getTallaNumeroProducto(id);
    }catch (error) {
        throw new Error("Error al obtener la talla del producto: " + error.message);
    }
}

export default getTallaNumeroProductoService;