import { getTallaLetraProducto } from '../../repositories/tallaLetraProducto.repository.js';

const getTallaLetraProductoService = async (id) => {
    try{
        return await getTallaLetraProducto(id);
    }catch (error) {
        throw new Error("Error al obtener la talla del producto: " + error.message);
    }
}

export default getTallaLetraProductoService;