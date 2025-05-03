import { updateUsuario } from "../../repositories/usuario.repository.js";
import { validaDatos } from "./validaDatos.js";

const updateUsuarioService = async (id, data) => {
    try {
        validaDatos(data);
        const result = await updateUsuario(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar el regístro: " + error.message);
    }
}


export default updateUsuarioService;