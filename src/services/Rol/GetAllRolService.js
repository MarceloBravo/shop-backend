import { getAllRol } from "../../repositories/rol.repository.js";

const getAllRolService = async () => {
    return await getAllRol();
}

export default getAllRolService;