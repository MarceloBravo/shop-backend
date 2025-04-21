import { softDeleteMarca } from '../../repositories/marca.repository.js';

const softDeleteMarcaService = async (id) => {
    try {
        const record = await softDeleteMarca(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la marca: " + error.message);
    }
}

export default softDeleteMarcaService;