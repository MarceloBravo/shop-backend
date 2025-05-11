import { softDeleteRol } from "../../repositories/rol.repository.js";

const softDeleteRolService = async (id) => {
    const record = await softDeleteRol(id);
    return (record && record.deleted_at !== null ? 200: 404);
}

export default softDeleteRolService;