import { getMenuTienda } from '../../repositories/menuTienda.repository.js';

const getMenuTiendaService = async (id) => {
    try{
        return await getMenuTienda(id);
    }catch (error) {
        throw new Error("Error al obtener la menuTienda: " + error.message);
    }
}

export default getMenuTiendaService;