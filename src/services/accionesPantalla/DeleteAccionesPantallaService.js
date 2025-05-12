import { deleteAccionesPantalla } from '../../repositories/accionesPantalla.repository.js';

const deleteAccionesPantallaService = async ({id}) => {
    try{
        return await deleteAccionesPantalla(id);
    } catch (error) {
        throw new Error("Error al eliminar el accionesPantalla: " + error.message);
    }
}

export default deleteAccionesPantallaService;