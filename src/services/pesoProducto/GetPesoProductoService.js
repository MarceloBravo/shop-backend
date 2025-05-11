import { getPesoProducto } from '../../repositories/pesoProducto.repository.js';

const getPesoProductoService = async (id) => {
    try{
        return await getPesoProducto(id);
    }catch (error) {
        throw new Error("Error al obtener el peso del producto: " + error.message);
    }
}

export default getPesoProductoService;