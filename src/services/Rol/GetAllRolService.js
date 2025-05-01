import { getAllRol } from "../../repositories/rol.repository.js";

const getAllRolService = async () => {
    try {
        return await getAllRol();
    } catch (error) {
        throw new Error("Error al obtener todos los roles: " + error.message);
    }
}

export default getAllRolService;