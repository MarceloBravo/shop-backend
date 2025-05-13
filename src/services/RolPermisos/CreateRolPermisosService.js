import { createRolPermisos } from "../../repositories/rolPermisos.repository.js";
import validaDatos from './ValidaDatos.js.js';

const createRolPermisosService = async (data) => {
    validaDatos(data);
    return await createRolPermisos(data);
}

export default createRolPermisosService;