import { deleteColor } from '../../repositories/color.repository.js';

const deleteColorService = async ({id}) => {
    try{
        return await deleteColor(id);
    } catch (error) {
        throw new Error("Error al eliminar el color: " + error.message);
    }
}

export default deleteColorService;