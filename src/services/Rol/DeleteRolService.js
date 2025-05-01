import { deleteRol } from "../../repositories/rol.repository.js"; 

const deleteRolService = async ({id}) => {
    try {
        return await deleteRol(id);
    } catch (error) {
        throw new Error("Error al eliminar el regístro: " + error.message);
    }
}

export default deleteRolService;