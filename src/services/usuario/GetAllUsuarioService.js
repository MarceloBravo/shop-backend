import { getAllUsuario } from "../../repositories/usuario.repository.js";

const getAllUsuarioService = async () => {
    try {
        return await getAllUsuario();
    } catch (error) {
        throw new Error("Error al obtener todos los usuarios: " + error.message);
    }
}

export default getAllUsuarioService;