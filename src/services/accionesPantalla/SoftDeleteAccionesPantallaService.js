import { softDeleteAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';

const softDeleteAccionesPantallaService = async (id) => {
    try {
        const record = await softDeleteAccionesPantalla(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar el accionesPantalla: " + error.message);
    }
}

export default softDeleteAccionesPantallaService;