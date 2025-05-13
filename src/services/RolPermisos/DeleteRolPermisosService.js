import { deleteRolPermisos } from "../../repositories/rolPermisos.repository.js"; 

const deleteRolPermisosService = async ({id}) => {
    return await deleteRolPermisos(id);
}

export default deleteRolPermisosService;