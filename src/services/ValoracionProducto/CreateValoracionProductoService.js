import { createValoracionProducto } from "../../repositories/valoracionProducto.repository.js";
import validaDatos from './ValidaDatos.js';

const createValoracionProductoService = async (data) => {
    validaDatos(data);
    return await createValoracionProducto(data);
}

export default createValoracionProductoService;