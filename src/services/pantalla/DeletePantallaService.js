import { deletePantalla } from '../../repositories/pantalla.repository.js';

const deletePantallaService = async ({id}) => {
    try{
        return await deletePantalla(id);
    } catch (error) {
        throw new Error("Error al eliminar la pantalla: " + error.message);
    }
}

export default deletePantallaService;