import { softDeleteUsuario } from "../../repositories/usuario.repository.js";

const softDeleteUsuarioService = async (id) => {
    try {
        const record = await softDeleteUsuario(id);
        return (record && record.deleted_at !== null ? 200: 404);
    } catch (error) {
        throw new Error("Error al eliminar el regístro: " + error.message);
    }
}

export default softDeleteUsuarioService;