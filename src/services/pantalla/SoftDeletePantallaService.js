import { softDeletePantalla } from '../../repositories/pantalla.repository.js';

const softDeletePantallaService = async (id) => {
    try {
        const record = await softDeletePantalla(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la pantalla: " + error.message);
    }
}

export default softDeletePantallaService;