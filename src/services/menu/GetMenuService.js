import { getMenu } from '../../repositories/menu.repository.js';

const getMenuService = async (id) => {
    try{
        return await getMenu(id);
    }catch (error) {
        throw new Error("Error al obtener la menu: " + error.message);
    }
}

export default getMenuService;