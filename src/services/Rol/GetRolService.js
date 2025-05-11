import { getRol } from "../../repositories/rol.repository.js";

const getRolService = async (id) => {
    return await getRol(id);
}

export default getRolService;