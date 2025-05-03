import { deleteUsuario } from "../../repositories/usuario.repository.js"; 

const deleteUsuarioService = async ({id}) => {
    try {
        return await deleteUsuario(id);
    } catch (error) {
        throw new Error("Error al eliminar el regístro: " + error.message);
    }
}

export default deleteUsuarioService;