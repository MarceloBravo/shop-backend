import { getAllPantalla } from '../../repositories/pantalla.repository.js';

const getAllPantallaService = async () => {
    try{
        return await getAllPantalla();
    }catch (error) {
        throw new Error("Error al obtener las pantallas: " + error.message);
    }
}

export default getAllPantallaService;