import { getPantalla } from '../../repositories/pantalla.repository.js';

const getPantallaService = async (id) => {
    try{
        return await getPantalla(id);
    }catch (error) {
        throw new Error("Error al obtener la pantalla: " + error.message);
    }
}

export default getPantallaService;