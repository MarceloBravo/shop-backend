import { getAllValoracionProducto } from "../../repositories/valoracionProducto.repository.js";

const getAllValoracionProductoService = async () => {
    return await getAllValoracionProducto();
}

export default getAllValoracionProductoService;