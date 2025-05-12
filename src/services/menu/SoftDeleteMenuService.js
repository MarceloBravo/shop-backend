import { softDeleteMenu } from '../../repositories/menu.repository.js';

const softDeleteMenuService = async (id) => {
    try {
        const record = await softDeleteMenu(id);
        return (record && record?.deleted_at !== null ? 200 : 404);
    } catch (error) {
        throw new Error("Error al eliminar la menu: " + error.message);
    }
}

export default softDeleteMenuService;