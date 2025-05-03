import { createUsuario } from "../../repositories/usuario.repository.js";
import { validaDatos } from "./validaDatos.js";

const createUsuarioService = async (data) => {
    validaDatos(data);
    return await createUsuario(data);
}

export default createUsuarioService;