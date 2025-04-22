import { softDeleteAtributo } from '../../repositories/atributo.repository.js';

const softDeleteAtributoService = async (id) => {
    try {
        const record = await softDeleteAtributo(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el atributo: " + error.message);
    }
}

export default softDeleteAtributoService;