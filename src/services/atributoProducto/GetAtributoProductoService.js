import { getAtributoProducto } from '../../repositories/atributoProducto.repository.js';

const getAtributoProductoService = async (id) => {
    try{
        return await getAtributoProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el atributo del producto: " + error.message);
    }
}

export default getAtributoProductoService;