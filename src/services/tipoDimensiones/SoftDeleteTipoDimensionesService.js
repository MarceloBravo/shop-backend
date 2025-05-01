import { softDeleteTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const softDeleteTipoDimensionesService = async (id) => {
    try {
        const record = await softDeleteTipoDimensiones(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default softDeleteTipoDimensionesService;