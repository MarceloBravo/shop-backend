import { getRol } from "../../repositories/rol.repository.js";

const getRolService = async (id) => {
    try {
        return await getRol(id);
    } catch (error) {
        throw new Error("Error al obtener el regístro: " + error.message);
    }
}

export default getRolService;