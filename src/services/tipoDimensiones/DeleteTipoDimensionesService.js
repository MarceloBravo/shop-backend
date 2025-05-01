import { deleteTipoDimensiones } from '../../repositories/tipoDimensiones.repository.js';

const deleteTipoDimensionesService = async ({id}) => {
    try{
        return await deleteTipoDimensiones(id);
    } catch (error) {
        throw new Error("Error al eliminar el registro: " + error.message);
    }
}

export default deleteTipoDimensionesService;