import { createRol } from "../../repositories/rol.repository.js";
import validaDatos from './ValidaDatos.js.js';

const createRolService = async (data) => {
    validaDatos(data);
    return await createRol(data);
}

export default createRolService;