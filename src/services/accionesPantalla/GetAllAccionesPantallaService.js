import { getAllAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';

const getAllAccionesPantallaService = async () => {
    try{
        return await getAllAccionesPantalla();
    }catch (error) {
        throw new Error("Error al obtener los registros: " + error.message);
    }
}

export default getAllAccionesPantallaService;