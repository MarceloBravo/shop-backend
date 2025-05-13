import { getAllMenuTienda } from '../../repositories/menuTienda.repository.js';

const getAllMenuTiendaService = async () => {
    try{
        return await getAllMenuTienda();
    }catch (error) {
        throw new Error("Error al obtener las menuTiendas: " + error.message);
    }
}

export default getAllMenuTiendaService;