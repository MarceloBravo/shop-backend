import { getUsuario } from "../../repositories/usuario.repository.js";

const getUsuarioService = async (id) => {
    try {
        return await getUsuario(id);
    } catch (error) {
        throw new Error("Error al obtener el regístro: " + error.message);
    }
}

export default getUsuarioService;