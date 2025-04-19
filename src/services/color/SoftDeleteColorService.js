import { softDeleteColor } from '../../repositories/color.repository.js';

const softDeleteColorService = async (id) => {
    try {
        const record = await softDeleteColor(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el color: " + error.message);
    }
}

export default softDeleteColorService;