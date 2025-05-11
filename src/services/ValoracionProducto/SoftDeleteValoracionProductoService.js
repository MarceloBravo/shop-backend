import { softDeleteValoracionProducto } from "../../repositories/valoracionProducto.repository.js";

const softDeleteValoracionProductoService = async (id) => {
    const record = await softDeleteValoracionProducto(id);
    return (record && record.deleted_at !== null ? 200: 404);
}

export default softDeleteValoracionProductoService;