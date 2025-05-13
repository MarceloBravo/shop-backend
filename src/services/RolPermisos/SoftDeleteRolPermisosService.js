import { softDeleteRolPermisos } from "../../repositories/rolPermisos.repository.js";

const softDeleteRolPermisosService = async (id) => {
    const record = await softDeleteRolPermisos(id);
    return (record && record.deleted_at !== null ? 200: 404);
}

export default softDeleteRolPermisosService;