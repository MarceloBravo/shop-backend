import { getAllMenu } from '../../repositories/menu.repository.js';

const getAllMenuService = async () => {
    try{
        return await getAllMenu();
    }catch (error) {
        throw new Error("Error al obtener las menus: " + error.message);
    }
}

export default getAllMenuService;