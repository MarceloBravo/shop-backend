import { getAllRolPermisos } from "../../repositories/rolPermisos.repository.js";

const getAllRolPermisosService = async () => {
    return await getAllRolPermisos();
}

export default getAllRolPermisosService;