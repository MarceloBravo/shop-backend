import { getRolPermisos } from "../../repositories/rolPermisos.repository.js";

const getRolPermisosService = async (id) => {
    return await getRolPermisos(id);
}

export default getRolPermisosService;