import { deleteRol } from "../../repositories/rol.repository.js"; 

const deleteRolService = async ({id}) => {
    return await deleteRol(id);
}

export default deleteRolService;