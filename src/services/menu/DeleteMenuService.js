import { deleteMenu } from '../../repositories/menu.repository.js';

const deleteMenuService = async ({id}) => {
    try{
        return await deleteMenu(id);
    } catch (error) {
        throw new Error("Error al eliminar la menu: " + error.message);
    }
}

export default deleteMenuService;