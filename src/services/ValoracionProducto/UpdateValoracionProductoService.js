import { updateValoracionProducto } from "../../repositories/valoracionProducto.repository.js";
import validaDatos from './ValidaDatos.js';

const updateValoracionProductoService = async (id, data) => {
    validaDatos(data);
    return await updateValoracionProducto(id, data);
}

export default updateValoracionProductoService;