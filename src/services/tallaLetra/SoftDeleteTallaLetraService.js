import { softDeleteTallaLetra } from '../../repositories/tallaLetra.repository.js';

const softDeleteTallaLetraService = async (id) => {
    try {
        const record = await softDeleteTallaLetra(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteTallaLetraService;