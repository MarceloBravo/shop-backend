import { softDeleteRol } from "../../repositories/rol.repository.js";

const softDeleteRolService = async (id) => {
    try {
        const record = await softDeleteRol(id);
        return (record && record.deleted_at !== null ? 200: 404);
    } catch (error) {
        throw new Error("Error al eliminar el regístro: " + error.message);
    }
}

export default softDeleteRolService;