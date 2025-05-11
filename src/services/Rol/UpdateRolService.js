import { updateRol } from "../../repositories/rol.repository.js";
import validaDatos from './ValidaDatos.js.js';

const updateRolService = async (id, data) => {
    validaDatos(data);
    return await updateRol(id, data);
}

export default updateRolService;