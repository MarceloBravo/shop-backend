import { softDeleteMenuTienda } from '../../repositories/menuTienda.repository.js';

const softDeleteMenuTiendaService = async (id) => {
    try {
        const record = await softDeleteMenuTienda(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la menuTienda: " + error.message);
    }
}

export default softDeleteMenuTiendaService;