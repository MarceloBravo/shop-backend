import { deleteValoracionProducto } from "../../repositories/valoracionProducto.repository.js"; 

const deleteValoracionProductoService = async ({id}) => {
    return await deleteValoracionProducto(id);
}

export default deleteValoracionProductoService;