import { deleteDimensionesProducto } from '../../repositories/dimensionesProducto.repository.js';

const deleteDimensionesProductoService = async ({id}) => {
    return await deleteDimensionesProducto(id);
}

export default deleteDimensionesProductoService;