import { getValoracionProducto } from "../../repositories/valoracionProducto.repository.js";

const getValoracionProductoService = async (id) => {
    return await getValoracionProducto(id);
}

export default getValoracionProductoService;