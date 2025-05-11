import { getColorProducto } from '../../repositories/colorProducto.repository.js';

const getColorProductoService = async (id) => {
    try{
        return await getColorProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el color del producto: " + error.message);
    }
}

export default getColorProductoService;