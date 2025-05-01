import { updatePantalla } from '../../repositories/pantalla.repository.js';

const updatePantallaService = async (id, data) => {
    try{
        const result = await updatePantalla(id, data);
        return result;
    } catch (error) {
        throw new Error("Error al actualizar la pantalla: " + error.message);
    }
}

export default updatePantallaService;