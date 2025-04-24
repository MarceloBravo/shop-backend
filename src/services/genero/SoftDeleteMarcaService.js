import { softDeleteGenero } from '../../repositories/genero.repository.js';

const softDeleteGeneroService = async (id) => {
    try {
        const record = await softDeleteGenero(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteGeneroService;