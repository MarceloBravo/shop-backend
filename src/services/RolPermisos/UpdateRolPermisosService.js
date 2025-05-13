import { updateRolPermisos } from "../../repositories/rolPermisos.repository.js";
import validaDatos from './ValidaDatos.js.js';

const updateRolPermisosService = async (id, data) => {
    validaDatos(data);
    return await updateRolPermisos(id, data);
}

export default updateRolPermisosService;