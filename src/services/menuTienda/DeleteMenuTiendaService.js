import { deleteMenuTienda } from '../../repositories/menuTienda.repository.js';

const deleteMenuTiendaService = async ({id}) => {
    try{
        return await deleteMenuTienda(id);
    } catch (error) {
        throw new Error("Error al eliminar la menuTienda: " + error.message);
    }
}

export default deleteMenuTiendaService;