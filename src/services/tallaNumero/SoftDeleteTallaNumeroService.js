import { softDeleteTallaNumero } from '../../repositories/tallaNumero.repository.js';

const softDeleteTallaNumeroService = async (id) => {
    try {
        const record = await softDeleteTallaNumero(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteTallaNumeroService;